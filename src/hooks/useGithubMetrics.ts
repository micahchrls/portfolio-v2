import { useState, useEffect } from 'react';

interface LanguageStats {
  [key: string]: number;  // language name: percentage
}

interface LanguageCategory {
  frontend: LanguageStats;
  backend: LanguageStats;
  other: LanguageStats;
}

interface GitHubMetrics {
  totalStars: number;
  totalRepos: number;
  totalCommits: number;
  contributions: number;
  languages: LanguageStats;
  languagesByCategory: LanguageCategory;
  loading: boolean;
  error: string | null;
}

// Your GitHub personal access token with 'repo' scope
// Use environment variable for security
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';

// Helper function for delay in async retry logic
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Cache for GitHub metrics to improve performance
const metricsCache: Record<string, {data: GitHubMetrics, timestamp: number}> = {};
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

// Batch size for API requests to avoid rate limiting
const BATCH_SIZE = 5;

// List of known problematic repositories to skip
const SKIP_REPOS = ['senpai'];

// Function to retry API calls with exponential backoff
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
  let retries = 0;
  
  while (retries < maxRetries) {
    const response = await fetch(url, options);
    
    // If rate limit exceeded, throw an error immediately
    if (response.status === 403) {
      const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
      if (rateLimitRemaining === '0') {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        throw new Error(`GitHub API rate limit exceeded. Resets at ${new Date(Number(resetTime) * 1000).toLocaleTimeString()}`);
      }
    }
    
    // If success, return the response
    if (response.status === 200) {
      return response;
    }
    
    // If 409 (Conflict), this likely means the repo is empty or has special status
    // Return the response directly so callers can handle it appropriately
    if (response.status === 409) {
      console.log(`GitHub API returned 409 (Conflict) for ${url}. Repository may be empty or unavailable.`);
      return response;
    }
    
    // If 202 (processing), wait with exponential backoff and retry
    if (response.status === 202) {
      const waitTime = Math.pow(2, retries) * 1000; // Exponential backoff: 1s, 2s, 4s, etc.
      console.log(`GitHub API returned 202 (processing). Waiting ${waitTime}ms before retry...`);
      await delay(waitTime);
      retries++;
      continue;
    }
    
    // For other error codes, throw an error
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
    }
    
    return response;
  }
  
  throw new Error(`Max retries (${maxRetries}) exceeded for ${url}`);
}

// Helper function to fetch all pages of a GitHub API endpoint
async function fetchAllPages<T>(url: string, headers: HeadersInit): Promise<T[]> {
  let currentUrl = url;
  const allResults: T[] = [];
  
  while (currentUrl) {
    const response = await fetchWithRetry(currentUrl, { headers });
    const results = await response.json();
    allResults.push(...results);
    
    // Check if there's a next page in the Link header
    const linkHeader = response.headers.get('Link');
    if (linkHeader && linkHeader.includes('rel="next"')) {
      const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
      currentUrl = nextMatch ? nextMatch[1] : '';
    } else {
      currentUrl = '';
    }
  }
  
  return allResults;
}

// Dynamic language categorization - analyze repo contents to determine frontend/backend
const categorizeLanguage = (language: string, repoData: any[]): 'frontend' | 'backend' | 'other' => {
  // Lowercase for case-insensitive comparison
  const lowerLang = language.toLowerCase();
  
  // Common patterns for frontend technologies
  const frontendPatterns = ['html', 'css', 'jsx', 'tsx', 'scss', 'less', 'vue', 'react', 'dom', 'ui', 'client', 'front'];
  // Common patterns for backend technologies
  const backendPatterns = ['server', 'api', 'sql', 'db', 'database', 'php', 'py', 'service', 'back', 'node'];
  
  // Check if language name itself contains any patterns
  for (const pattern of frontendPatterns) {
    if (lowerLang.includes(pattern)) return 'frontend';
  }
  
  for (const pattern of backendPatterns) {
    if (lowerLang.includes(pattern)) return 'backend';
  }
  
  // If no match in name, look at how the language is used in repos
  // Check the names and topics of repos that use this language
  const reposWithLanguage = repoData.filter(repo => {
    return repo.language === language || 
           (repo.topics && repo.topics.some((topic: string) => topic.toLowerCase().includes(lowerLang)));
  });
  
  if (reposWithLanguage.length > 0) {
    let frontendScore = 0;
    let backendScore = 0;
    
    for (const repo of reposWithLanguage) {
      // Check repo name and description for clues
      const repoName = repo.name.toLowerCase();
      const repoDesc = (repo.description || '').toLowerCase();
      const repoTopics = repo.topics || [];
      
      // Score based on repo name/description
      for (const pattern of frontendPatterns) {
        if (repoName.includes(pattern) || repoDesc.includes(pattern)) frontendScore++;
        if (repoTopics.some((topic: string) => topic.toLowerCase().includes(pattern))) frontendScore++;
      }
      
      for (const pattern of backendPatterns) {
        if (repoName.includes(pattern) || repoDesc.includes(pattern)) backendScore++;
        if (repoTopics.some((topic: string) => topic.toLowerCase().includes(pattern))) backendScore++;
      }
    }
    
    if (frontendScore > backendScore) return 'frontend';
    if (backendScore > frontendScore) return 'backend';
  }
  
  // Well-known languages that might not match patterns
  if (['javascript', 'typescript'].includes(lowerLang)) return 'frontend';
  if (['python', 'ruby', 'go', 'java', 'c#', 'php'].includes(lowerLang)) return 'backend';
  
  return 'other';
};

const useGitHubMetrics = (username: string): GitHubMetrics => {
  const [metrics, setMetrics] = useState<GitHubMetrics>({
    totalStars: 0,
    totalRepos: 0,
    totalCommits: 0,
    contributions: 0,
    languages: {},
    languagesByCategory: {
      frontend: {},
      backend: {},
      other: {}
    },
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGitHubMetrics = async () => {
      // First check cache
      const now = Date.now();
      if (metricsCache[username] && (now - metricsCache[username].timestamp) < CACHE_DURATION) {
        console.log('Using cached GitHub metrics');
        setMetrics(metricsCache[username].data);
        return;
      }
      
      try {
        // Start loading
        setMetrics(prev => ({ ...prev, loading: true, error: null }));
        
        // Set up headers with authentication token
        const headers: HeadersInit = {
          Authorization: `token ${GITHUB_TOKEN}`
        };
        
        // Fetch ALL repositories including private ones with added fields like topics
        // Use fetchAllPages to handle pagination
        console.log('Fetching all repositories...');
        const repos = await fetchAllPages<any>(
          `https://api.github.com/users/${username}/repos?type=all&per_page=100&sort=pushed`, 
          headers
        );
        
        console.log(`Found ${repos.length} repositories`);
        
        // Calculate total repos and stars
        const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
        const totalRepos = repos.length;
        
        // Fetch user data for contribution stats
        const userResponse = await fetchWithRetry(
          `https://api.github.com/users/${username}`, 
          { headers }
        );
        
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        
        // Try to get contribution activity, but this is NOT required since it might fail
        let contributions = userData.public_repos + userData.public_gists;
        
        // Process all non-fork repos for accurate metrics
        // For very large accounts, we might still want to limit this for performance
        const MAX_REPOS_FOR_DETAILS = 30; // Increased from 10
        
        // First prioritize non-fork repositories for language data and commits
        const priorityRepos = repos
          .filter((repo: any) => !repo.fork)
          .slice(0, MAX_REPOS_FOR_DETAILS);
          
        // If we don't have enough non-fork repos, add some forks to reach our limit
        let reposToProcess = priorityRepos;
        if (priorityRepos.length < MAX_REPOS_FOR_DETAILS) {
          const forksToInclude = repos
            .filter((repo: any) => repo.fork)
            .slice(0, MAX_REPOS_FOR_DETAILS - priorityRepos.length);
          reposToProcess = [...priorityRepos, ...forksToInclude];
        }
        
        console.log(`Processing ${reposToProcess.length} repositories for detailed metrics`);
        
        // Fetch total commits across repositories (in batches)
        let totalCommits = 0;
        
        for (let i = 0; i < reposToProcess.length; i += BATCH_SIZE) {
          const batch = reposToProcess.slice(i, i + BATCH_SIZE);
          
          const commitPromises = batch.map(async (repo: any) => {
            try {
              // Skip known problematic repositories
              if (SKIP_REPOS.includes(repo.name)) {
                console.log(`Skipping known problematic repository: ${repo.name}`);
                return 0;
              }
              
              // Check if repository is accessible
              const repoResponse = await fetchWithRetry(
                `https://api.github.com/repos/${username}/${repo.name}`,
                { headers }
              );
              if (!repoResponse.ok) {
                console.log(`Repository ${repo.name} is not accessible. Skipping...`);
                return 0;
              }
              
              // Use commits endpoint with author filter - much faster than stats/contributors
              const commitsResponse = await fetchWithRetry(
                `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=1`,
                { headers }
              );
              
              // Handle successful responses
              if (commitsResponse.status === 200) {
                // Use the Link header to get total commit count
                const linkHeader = commitsResponse.headers.get('Link');
                if (linkHeader && linkHeader.includes('rel="last"')) {
                  const match = linkHeader.match(/page=(\d+)>; rel="last"/);
                  if (match) {
                    return parseInt(match[1], 10);
                  }
                }
                
                // If no pagination or single page, check if any commits exist
                const commits = await commitsResponse.json();
                return commits.length;
              }
              
              // Handle 409 Conflict - treat as repository with 0 commits
              if (commitsResponse.status === 409) {
                console.log(`Repository ${repo.name} returned 409. Treating as 0 commits.`);
                return 0;
              }
              
              // For any other status code, log and return 0
              console.log(`Repository ${repo.name} returned unexpected status: ${commitsResponse.status}`);
              return 0;
            } catch (error) {
              console.error(`Error fetching commits for ${repo.name}:`, error);
              return 0;
            }
          });
          
          // Wait for batch to complete
          const batchCommits = await Promise.all(commitPromises);
          totalCommits += batchCommits.reduce((sum, count) => sum + count, 0);
        }
        
        // Fetch language statistics in batches
        const languageCounts: Record<string, number> = {};
        let totalBytes = 0;
        
        for (let i = 0; i < reposToProcess.length; i += BATCH_SIZE) {
          const batch = reposToProcess.slice(i, i + BATCH_SIZE);
          
          const languagePromises = batch.map(async (repo: any) => {
            try {
              const languageResponse = await fetchWithRetry(
                `https://api.github.com/repos/${username}/${repo.name}/languages`, 
                { headers }
              );
              
              if (languageResponse.ok) {
                try {
                  return { name: repo.name, languages: await languageResponse.json() };
                } catch (e) {
                  console.error(`JSON parse error for ${repo.name} languages:`, e);
                  return { name: repo.name, languages: {} };
                }
              }
              return { name: repo.name, languages: {} };
            } catch (error) {
              console.error(`Error fetching languages for ${repo.name}:`, error);
              return { name: repo.name, languages: {} };
            }
          });
          
          // Wait for batch to complete
          const batchLanguages = await Promise.all(languagePromises);
          
          // Process language data from this batch
          batchLanguages.forEach(({ languages }) => { // Removed unused 'name' parameter
            for (const [language, bytes] of Object.entries(languages)) {
              const byteCount = bytes as number;
              
              // Skip very small contributions
              if (byteCount < 100) continue; // Lower threshold to include more languages
              
              languageCounts[language] = (languageCounts[language] || 0) + byteCount;
              totalBytes += byteCount;
            }
          });
        }

        // Calculate language percentages
        const languages: LanguageStats = {};
        if (totalBytes > 0) {
          for (const [language, bytes] of Object.entries(languageCounts)) {
            languages[language] = Math.round((bytes / totalBytes) * 1000) / 10; // Get percentage with 1 decimal place
          }
        }

        // Sort languages by percentage (descending)
        const sortedLanguages = Object.entries(languages)
          .sort(([, percentA], [, percentB]) => percentB - percentA)
          .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        // Dynamically categorize languages without hardcoded lists
        const frontendLanguages: LanguageStats = {};
        const backendLanguages: LanguageStats = {};
        const otherLanguages: LanguageStats = {};
        
        // Process each language and categorize it
        for (const [language, percentage] of Object.entries(sortedLanguages)) {
          const category = categorizeLanguage(language, repos);
          
          switch (category) {
            case 'frontend':
              frontendLanguages[language as string] = percentage as number;
              break;
            case 'backend':
              backendLanguages[language as string] = percentage as number;
              break;
            default:
              otherLanguages[language as string] = percentage as number;
          }
        }

        // Create final metrics object
        const finalMetrics = {
          totalStars,
          totalRepos,
          totalCommits,
          contributions,
          languages: sortedLanguages,
          languagesByCategory: {
            frontend: frontendLanguages,
            backend: backendLanguages,
            other: otherLanguages
          },
          loading: false,
          error: null
        };
        
        // Update cache
        metricsCache[username] = {
          data: finalMetrics,
          timestamp: now
        };
        
        // Set state
        setMetrics(finalMetrics);
        
      } catch (error) {
        console.error('Error fetching GitHub metrics:', error);
        setMetrics(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error fetching GitHub data'
        }));
      }
    };

    fetchGitHubMetrics();
  }, [username]);

  return metrics;
};

export default useGitHubMetrics;
