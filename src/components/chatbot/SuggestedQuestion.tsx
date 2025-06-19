import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SuggestedQuestionProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function SuggestedQuestion({ children, onClick }: SuggestedQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={onClick}
        variant="outline"
        size="sm"
        className="rounded-full text-xs py-1 h-auto bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-muted/80 transition-colors"
      >
        {children}
      </Button>
    </motion.div>
  );
}
