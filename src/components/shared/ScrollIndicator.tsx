"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface ScrollIndicatorProps {
  delay?: number;
}

export function ScrollIndicator({ delay = 1.5 }: ScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <span className="text-muted-foreground font-mono text-xs tracking-[0.08em] uppercase">
        Scroll
      </span>
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="text-muted-foreground h-4 w-4" />
      </motion.div>
    </motion.div>
  );
}
