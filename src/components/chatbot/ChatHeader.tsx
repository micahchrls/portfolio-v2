import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-xl">
      <CardHeader className={cn(
        "flex flex-row items-center justify-between space-y-0 pb-4 p-3",
        "bg-white/80 dark:bg-zinc-900/80",
        "border-b border-border/50",
        "shadow-[0_1px_4px_rgba(0,0,0,0.02),0_4px_8px_rgba(0,0,0,0.02)]",
      )}>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <img
              src="/avatar.jpeg"
              alt="Micah"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-background"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">Chat with Micah</CardTitle>
            <span className="text-[10px] text-muted-foreground/70">
              Powered by Google Gemini
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
    </div>
  );
}
