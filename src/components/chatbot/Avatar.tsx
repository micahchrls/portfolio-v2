import React from "react";
import { Avatar as UIAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar: React.FC = () => (
  <div className="relative">
    <UIAvatar className="h-6 w-6 ring-2 ring-background">
      <AvatarImage src="/avatar.jpeg" alt="Micah" />
      <AvatarFallback>ML</AvatarFallback>
    </UIAvatar>
    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
  </div>
);
