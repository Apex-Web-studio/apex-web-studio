"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background fixed inset-0 z-[100] flex flex-col items-center justify-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-heading font-700 mb-8 text-sm tracking-[0.2em] uppercase"
            >
              Apex Web Studio
            </motion.span>

            <div className="bg-border relative h-[1px] w-48 overflow-hidden">
              <motion.div
                className="bg-primary absolute inset-y-0 left-0"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            <motion.span
              className="text-muted-foreground mt-4 font-mono text-xs tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {count}%
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
