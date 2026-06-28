"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { TECHNOLOGIES } from "@/constants";
import { useTextReveal } from "@/hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

export function Technologies() {
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  const headingRef = useTextReveal<HTMLHeadingElement>({
    splitBy: "words",
    stagger: 0.05,
    duration: 0.8,
  });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersRM = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersRM) return;

    const ctx = gsap.context(() => {
      gsap.from(grid.children, {
        y: 25,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="technologies">
      <div className="mb-16 text-center md:mb-20">
        <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
          Tech Stack
        </span>
        <h2
          ref={headingRef}
          className="font-heading font-700 mx-auto max-w-lg tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.05" }}
        >
          Built with the tools we trust.
        </h2>
      </div>

      <div
        ref={gridRef}
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3"
        role="list"
      >
        {TECHNOLOGIES.map((tech) => (
          <motion.div
            key={tech.name}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 rounded-full border px-5 py-2.5 transition-colors duration-200"
            role="listitem"
          >
            <span className="text-muted-foreground text-sm font-[500]">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
