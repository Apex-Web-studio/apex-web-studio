"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { CounterAnimation } from "@/components/shared/CounterAnimation";
import { STATS, PHILOSOPHY } from "@/constants";
import {
  staggerContainer,
  staggerItem,
  viewportConfig,
} from "@/lib/animations";

export function WhyApex() {
  return (
    <SectionWrapper id="why-apex">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left — narrative */}
        <div>
          <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
            Why Apex
          </span>
          <h2
            className="font-heading font-700 mb-6 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "1.05",
            }}
          >
            Built on craft,
            <br /> driven by vision.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg text-[1.0625rem] leading-[1.7]">
            {PHILOSOPHY}
          </p>
          <div className="space-y-4">
            {[
              "Obsessive attention to every pixel and interaction",
              "Strategy-first approach grounded in real user research",
              "Modern tech stack optimized for performance and SEO",
              "Transparent process with weekly progress updates",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                <span className="text-muted-foreground text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 gap-4"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="border-border/50 bg-card flex flex-col items-center justify-center rounded-xl border p-8 text-center"
            >
              <span className="font-heading font-800 text-foreground mb-2 text-4xl tracking-tight md:text-5xl">
                <CounterAnimation value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-muted-foreground font-mono text-[11px] tracking-[0.1em] uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
