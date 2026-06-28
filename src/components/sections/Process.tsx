"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { PROCESS_STEPS } from "@/constants";
import {
  staggerContainerSlow,
  staggerItem,
  viewportConfig,
} from "@/lib/animations";

export function Process() {
  return (
    <SectionWrapper id="process">
      <div className="mb-16 md:mb-20">
        <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
          Process
        </span>
        <h2
          className="font-heading font-700 max-w-md tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.05" }}
        >
          How we bring ideas to life.
        </h2>
      </div>

      <motion.div
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PROCESS_STEPS.map((step, i) => (
          <motion.div
            key={step.step}
            variants={staggerItem}
            className="group relative"
          >
            {/* Connector line */}
            {i < PROCESS_STEPS.length - 1 && (
              <div className="bg-border absolute top-12 right-0 hidden h-px w-6 translate-x-full lg:block" />
            )}

            <div className="border-border/50 bg-card hover:border-primary/30 rounded-xl border p-8 transition-colors duration-300">
              <div className="mb-6 flex items-center gap-4">
                <span className="border-primary/30 text-primary flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm font-[500]">
                  {step.step}
                </span>
                <div className="bg-border h-px flex-1" />
              </div>
              <h3 className="font-heading font-700 mb-3 text-xl tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
