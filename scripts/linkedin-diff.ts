import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { experiences } from '../src/data/experiences.js';
import { certifications } from '../src/data/certifications.js';
import { aboutContent } from '../src/components/main-components/About.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_PATH = resolve(__dirname, 'linkedin-snapshot.json');

const isConfirm = process.argv.includes('--confirm');

interface Snapshot {
  _note: string;
  syncedAt: string;
  about: { intro: string; skills: string[] };
  experiences: Array<{
    company: string;
    role: string;
    duration: string;
    bullets: string[];
    skills: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    issuedDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    skills: string[];
  }>;
}

const snapshot: Snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf-8'));

let totalChanges = 0;
const lines: string[] = [];

const DIVIDER = '─'.repeat(50);

function heading(title: string) {
  lines.push('');
  lines.push(title);
  lines.push(DIVIDER);
}

// ── About ──────────────────────────────────────────────────────────
heading('ABOUT');

const currentIntro = aboutContent.intro;
const currentSkills = aboutContent.skills;

if (currentIntro !== snapshot.about.intro) {
  totalChanges++;
  lines.push('~ CHANGED: Bio / Summary');
  lines.push('  OLD: ' + snapshot.about.intro.slice(0, 80) + '…');
  lines.push('  NEW: ' + currentIntro);
}

const addedSkills = currentSkills.filter(s => !snapshot.about.skills.includes(s));
const removedSkills = snapshot.about.skills.filter(s => !currentSkills.includes(s));

if (addedSkills.length) {
  totalChanges++;
  lines.push('+ SKILLS ADDED: ' + addedSkills.join(', '));
}
if (removedSkills.length) {
  totalChanges++;
  lines.push('- SKILLS REMOVED: ' + removedSkills.join(', '));
}

if (currentIntro === snapshot.about.intro && !addedSkills.length && !removedSkills.length) {
  lines.push('  ✓ No changes');
}

// ── Experience ─────────────────────────────────────────────────────
heading('EXPERIENCE');

const snapExpByKey = new Map(snapshot.experiences.map(e => [`${e.company}|${e.role}`, e]));
const currExpByKey = new Map(experiences.map(e => [`${e.company}|${e.role}`, e]));

let expChanges = 0;

for (const [key, curr] of currExpByKey) {
  const prev = snapExpByKey.get(key);
  if (!prev) {
    expChanges++;
    lines.push(`+ ADDED: "${curr.role}" at ${curr.company}`);
    lines.push(`  Duration:    ${curr.duration}`);
    lines.push(`  Description: ${curr.bullets.join('\n               • ')}`);
    lines.push(`  Skills:      ${curr.skills.join(', ')}`);
  } else {
    const fieldChanges: string[] = [];
    if (curr.duration !== prev.duration) fieldChanges.push(`  Duration:    OLD: ${prev.duration}\n               NEW: ${curr.duration}`);
    const prevBullets = prev.bullets ?? [];
    if (curr.bullets.join('\n') !== prevBullets.join('\n')) fieldChanges.push(`  Description: OLD: ${prevBullets.join(' ').slice(0, 60)}…\n               NEW: ${curr.bullets.join('\n               • ')}`);
    const addedS = curr.skills.filter(s => !prev.skills.includes(s));
    const removedS = prev.skills.filter(s => !curr.skills.includes(s));
    if (addedS.length) fieldChanges.push(`  Skills +: ${addedS.join(', ')}`);
    if (removedS.length) fieldChanges.push(`  Skills -: ${removedS.join(', ')}`);

    if (fieldChanges.length) {
      expChanges++;
      lines.push(`~ CHANGED: "${curr.role}" at ${curr.company}`);
      lines.push(...fieldChanges);
    }
  }
}

for (const [key, prev] of snapExpByKey) {
  if (!currExpByKey.has(key)) {
    expChanges++;
    lines.push(`- REMOVED: "${prev.role}" at ${prev.company}`);
  }
}

if (expChanges === 0) lines.push('  ✓ No changes');
totalChanges += expChanges;

// ── Certifications ─────────────────────────────────────────────────
heading('CERTIFICATIONS');

const snapCertByKey = new Map(snapshot.certifications.map(c => [`${c.name}|${c.issuer}`, c]));
const currCertByKey = new Map(certifications.map(c => [`${c.name}|${c.issuer}`, c]));

let certChanges = 0;

for (const [key, curr] of currCertByKey) {
  const prev = snapCertByKey.get(key);
  if (!prev) {
    certChanges++;
    lines.push(`+ ADDED: "${curr.name}"`);
    lines.push(`  Issuer:  ${curr.issuer}`);
    lines.push(`  Issued:  ${curr.issuedDate}${curr.expiryDate ? ' · Expires: ' + curr.expiryDate : ''}`);
    if (curr.credentialId) lines.push(`  ID:      ${curr.credentialId}`);
    if (curr.credentialUrl) lines.push(`  URL:     ${curr.credentialUrl}`);
    lines.push(`  Skills:  ${curr.skills.join(', ')}`);
  } else {
    const fieldChanges: string[] = [];
    if (curr.issuedDate !== prev.issuedDate) fieldChanges.push(`  Issued:  OLD: ${prev.issuedDate}  NEW: ${curr.issuedDate}`);
    if ((curr.expiryDate ?? '') !== (prev.expiryDate ?? '')) fieldChanges.push(`  Expires: OLD: ${prev.expiryDate ?? 'none'}  NEW: ${curr.expiryDate ?? 'none'}`);
    if ((curr.credentialUrl ?? '') !== (prev.credentialUrl ?? '')) fieldChanges.push(`  URL:     OLD: ${prev.credentialUrl ?? 'none'}\n           NEW: ${curr.credentialUrl ?? 'none'}`);
    const addedS = curr.skills.filter(s => !prev.skills.includes(s));
    const removedS = prev.skills.filter(s => !curr.skills.includes(s));
    if (addedS.length) fieldChanges.push(`  Skills +: ${addedS.join(', ')}`);
    if (removedS.length) fieldChanges.push(`  Skills -: ${removedS.join(', ')}`);

    if (fieldChanges.length) {
      certChanges++;
      lines.push(`~ CHANGED: "${curr.name}" (${curr.issuer})`);
      lines.push(...fieldChanges);
    }
  }
}

for (const [key, prev] of snapCertByKey) {
  if (!currCertByKey.has(key)) {
    certChanges++;
    lines.push(`- REMOVED: "${prev.name}" (${prev.issuer})`);
  }
}

if (certChanges === 0) lines.push('  ✓ No changes');
totalChanges += certChanges;

// ── Output ─────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
console.log('');
console.log(`LinkedIn Sync Report — ${today}`);
console.log('='.repeat(50));
console.log(lines.join('\n'));
console.log('');

if (totalChanges === 0) {
  console.log('✅  No changes — LinkedIn is in sync.');
} else {
  console.log(`⚠️  ${totalChanges} change(s) need updating on LinkedIn.`);
  console.log('');
  console.log('After updating LinkedIn, run:');
  console.log('  npm run linkedin-sync');
}

console.log('');

// ── Sync (write snapshot) ──────────────────────────────────────────
if (isConfirm) {
  const newSnapshot: Snapshot = {
    _note: snapshot._note,
    syncedAt: today,
    about: {
      intro: currentIntro,
      skills: currentSkills,
    },
    experiences: experiences.map(e => ({
      company: e.company,
      role: e.role,
      duration: e.duration,
      bullets: e.bullets,
      skills: e.skills,
    })),
    certifications: certifications.map(c => ({
      name: c.name,
      issuer: c.issuer,
      issuedDate: c.issuedDate,
      expiryDate: c.expiryDate,
      credentialId: c.credentialId,
      credentialUrl: c.credentialUrl,
      skills: c.skills,
    })),
  };

  writeFileSync(SNAPSHOT_PATH, JSON.stringify(newSnapshot, null, 2) + '\n');
  console.log(`✅  Snapshot updated — synced at ${today}.`);
  console.log('');
}
