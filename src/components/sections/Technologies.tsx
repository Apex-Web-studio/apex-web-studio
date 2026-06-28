"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { TECHNOLOGIES } from "@/constants";
import {
  staggerContainer,
  staggerItem,
  viewportConfig,
} from "@/lib/animations";

export function Technologies() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="technologies">
      <div className="mb-16 text-center md:mb-20">
        <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
          Tech Stack
        </span>
        <h2
          className="font-heading font-700 mx-auto max-w-lg tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.05" }}
        >
          Built with the tools we trust.
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3"
        role="list"
      >
        {TECHNOLOGIES.map((tech) => (
          <motion.div
            key={tech.name}
            variants={staggerItem}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 rounded-full border px-5 py-2.5 transition-colors duration-200"
            role="listitem"
          >
            <span className="text-muted-foreground group-hover:text-foreground text-sm font-[500] transition-colors">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
