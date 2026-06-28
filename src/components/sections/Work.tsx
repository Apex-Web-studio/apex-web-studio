"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { PROJECTS } from "@/constants";
import { useTextReveal } from "@/hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

export function Work() {
  const gridRef = useRef<HTMLDivElement>(null);

  const headingRef = useTextReveal<HTMLHeadingElement>({
    splitBy: "words",
    stagger: 0.05,
    duration: 0.8,
    ease: "power4.out",
  });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(grid.children, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: grid,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="work">
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-primary mb-2 block font-mono text-[10px] tracking-[0.15em] uppercase sm:mb-3 sm:text-xs">
            Selected Work
          </span>
          <h2
            ref={headingRef}
            className="font-heading font-700 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
              lineHeight: "1.05",
            }}
          >
            Projects that speak for themselves.
          </h2>
        </div>
        <p className="text-muted-foreground max-w-sm text-sm sm:text-base">
          Every project is a partnership. Here are some of the brands we&apos;ve
          helped elevate.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8"
      >
        {PROJECTS.map((project, index) => (
          <div key={project.id}>
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
