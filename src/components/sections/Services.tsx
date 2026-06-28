"use client";

import { motion } from "framer-motion";
import { Layout, Palette, Code, PenTool, Sparkles, Blocks } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SERVICES } from "@/constants";
import {
  staggerContainerSlow,
  staggerItem,
  viewportConfig,
} from "@/lib/animations";

const iconMap: Record<string, React.ReactNode> = {
  layout: <Layout className="h-5 w-5" />,
  palette: <Palette className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  figma: <PenTool className="h-5 w-5" />,
  sparkles: <Sparkles className="h-5 w-5" />,
  blocks: <Blocks className="h-5 w-5" />,
};

export function Services() {
  return (
    <SectionWrapper id="services">
      <div className="mb-16 md:mb-20">
        <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
          Services
        </span>
        <h2
          className="font-heading font-700 max-w-xl tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.05" }}
        >
          Everything you need to stand out online.
        </h2>
      </div>

      <motion.div
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <motion.div
            key={service.title}
            variants={staggerItem}
            className="group border-border/50 bg-card hover:border-primary/30 relative overflow-hidden rounded-xl border p-8 transition-colors duration-300"
          >
            {/* Hover glow */}
            <div className="bg-primary/5 pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="border-border bg-background text-primary mb-5 flex h-10 w-10 items-center justify-center rounded-lg border">
                {iconMap[service.icon]}
              </div>
              <h3 className="font-heading font-700 mb-3 text-lg tracking-tight">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
