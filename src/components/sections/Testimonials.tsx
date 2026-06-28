"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { TESTIMONIALS } from "@/constants";
import {
  staggerContainerSlow,
  staggerItem,
  viewportConfig,
} from "@/lib/animations";

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <div className="mb-16 md:mb-20">
        <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
          Testimonials
        </span>
        <h2
          className="font-heading font-700 max-w-lg tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.05" }}
        >
          What our clients say.
        </h2>
      </div>

      <motion.div
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {TESTIMONIALS.map((testimonial) => (
          <motion.div
            key={testimonial.name}
            variants={staggerItem}
            className="group border-border/50 bg-card hover:border-primary/20 relative rounded-xl border p-8 transition-colors duration-300"
          >
            <Quote className="text-primary/20 mb-6 h-8 w-8" />
            <p className="text-muted-foreground mb-8 text-[15px] leading-[1.7]">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs font-[600]">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-foreground text-sm font-[500]">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
