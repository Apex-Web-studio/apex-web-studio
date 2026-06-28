"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { PROJECTS } from "@/constants";
import {
  staggerContainer,
  staggerItem,
  viewportConfig,
} from "@/lib/animations";
import { useTextReveal } from "@/hooks/useTextReveal";

export function Work() {
  const headingRef = useTextReveal<HTMLHeadingElement>({
    splitBy: "words",
    stagger: 0.05,
    duration: 0.8,
    ease: "power4.out",
  });

  return (
    <SectionWrapper id="work">
      <div className="mb-16 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
            Selected Work
          </span>
          <h2
            ref={headingRef}
            className="font-heading font-700 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "1.05",
            }}
          >
            Projects that speak for themselves.
          </h2>
        </div>
        <p className="text-muted-foreground max-w-sm text-base">
          Every project is a partnership. Here are some of the brands we&apos;ve
          helped elevate.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
      >
        {PROJECTS.map((project, index) => (
          <motion.div key={project.id} variants={staggerItem}>
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
