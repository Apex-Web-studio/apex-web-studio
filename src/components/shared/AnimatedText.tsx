"use client";

import { motion } from "framer-motion";
import { heroLetterVariant } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.03, delayChildren: delay }}
      className={className}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={heroLetterVariant}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}
