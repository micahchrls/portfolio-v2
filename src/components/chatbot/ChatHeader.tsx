import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  onClose: () => void;
  isOnline?: boolean;
}

export function ChatHeader({ onClose, isOnline = true }: ChatHeaderProps) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-xl rounded-t-xl">
      <CardHeader 
        className={cn(
          "flex flex-row items-center justify-between space-y-0 p-2 sm:p-3 rounded-t-xl",
          "bg-white/80 dark:bg-background/80",
          "border-b border-border/50",
          "shadow-sm transition-shadow duration-200",
        )}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-shrink-0">
            <img
              src="/avatar.jpeg"
              alt="Micah's profile picture"
              width={28}
              height={28}
              className="rounded-full object-cover ring-1 ring-border/50 transition-opacity sm:w-8 sm:h-8 w-7 h-7"
            />
          </div>
          <div className="flex flex-col">
            <CardTitle className="text-sm sm:text-base font-semibold leading-none mb-1">
              Chat with Micah
            </CardTitle>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  )} />
                  <span className={cn(
                    "relative inline-flex rounded-full h-2 w-2",
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  )} />
                </span>
                Online
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                Powered by Google Gemini
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-destructive/10 hover:text-destructive transition-colors"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
    </div>
  );
}
