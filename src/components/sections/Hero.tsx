"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { ScrollIndicator } from "@/components/shared/ScrollIndicator";
import { TAGLINE, HERO_SUBTITLE } from "@/constants";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 md:px-8"
      aria-label="Hero"
    >
      {/* Animated gradient orbs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full opacity-[0.07] blur-[120px] will-change-transform"
          style={{
            background: "oklch(0.58 0.17 275)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full opacity-[0.05] blur-[120px] will-change-transform"
          style={{
            background: "oklch(0.58 0.12 300)",
            animation: "float 10s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="bg-primary h-[1px] w-8" aria-hidden="true" />
          <span className="text-primary font-mono text-xs tracking-[0.15em] uppercase">
            Digital Design Agency
          </span>
          <span className="bg-primary h-[1px] w-8" aria-hidden="true" />
        </motion.div>

        <h1
          className="font-heading leading-[0.95] font-[800] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.75rem, 8vw, 7.5rem)" }}
        >
          <AnimatedText text="APEX WEB" />
          <br />
          <AnimatedText text="STUDIO" delay={0.3} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-foreground max-w-xs text-lg font-[500] sm:text-xl md:max-w-sm md:text-2xl"
        >
          {TAGLINE}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground max-w-sm text-sm sm:text-base md:max-w-lg md:text-lg"
        >
          {HERO_SUBTITLE}
        </motion.p>
      </div>

      <div className="absolute bottom-10">
        <ScrollIndicator delay={1.8} />
      </div>

      <div
        className="via-border absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
