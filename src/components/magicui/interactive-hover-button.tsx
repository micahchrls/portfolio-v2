import React, { ElementType } from "react";
import { MessageCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ElementType;
  initialColor?: string;
  hoverColor?: string;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, icon: Icon = MessageCircle, initialColor, hoverColor, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-full cursor-pointer overflow-hidden rounded-lg border bg-background p-2 px-10 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className={cn(
          "h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]",
          "bg-primary"
        )}></div>
        <span className="inline-block transition-all text-xs duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className={cn(
        "absolute text-xs top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-9 group-hover:opacity-100",
        "text-primary-foreground"
      )}>
        <span>{children}</span>
        <Icon className="w-5 h-5" />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
