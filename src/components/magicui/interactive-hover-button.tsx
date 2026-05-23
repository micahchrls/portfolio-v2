import React, { ElementType } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ElementType;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, icon: Icon = ArrowRight, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-lg border bg-background py-2 px-6 text-sm font-medium",
        className,
      )}
      {...props}
    >
      {/* Expanding dot — absolutely positioned so scale origin is reliable */}
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-foreground transition-transform duration-500 ease-in-out group-hover:scale-[40]" />

      {/* Normal state label */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-xs text-foreground transition-all duration-200 group-hover:opacity-0 group-hover:translate-x-3">
        {/* Spacer so text is visually centered despite the dot */}
        <span className="w-2.5 flex-shrink-0" />
        <span className="leading-none">{children}</span>
      </span>

      {/* Hover state label */}
      <span className="absolute inset-0 z-10 flex items-center justify-center gap-1.5 text-xs text-background opacity-0 -translate-x-3 transition-all duration-200 delay-75 group-hover:opacity-100 group-hover:translate-x-0">
        <span className="leading-none font-semibold">{children}</span>
        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      </span>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
