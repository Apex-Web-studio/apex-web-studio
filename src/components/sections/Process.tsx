"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { PROCESS_STEPS } from "@/constants";
import { useTextReveal } from "@/hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useTextReveal<HTMLHeadingElement>({
    splitBy: "words",
    stagger: 0.05,
    duration: 0.8,
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
        y: 50,
        opacity: 0,
        duration: 0.7,
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
    <SectionWrapper id="process">
      <div className="mb-10 sm:mb-14 md:mb-20">
        <span className="text-primary mb-2 block font-mono text-[10px] tracking-[0.15em] uppercase sm:mb-3 sm:text-xs">
          Process
        </span>
        <h2
          ref={headingRef}
          className="font-heading font-700 max-w-md tracking-[-0.02em]"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
            lineHeight: "1.05",
          }}
        >
          How we bring ideas to life.
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
      >
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.step} className="group relative">
            {i < PROCESS_STEPS.length - 1 && (
              <div className="bg-border absolute top-12 right-0 hidden h-px w-6 translate-x-full lg:block" />
            )}

            <div className="border-border/50 bg-card hover:border-primary/30 rounded-xl border p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(103,117,224,0.06)] sm:p-8">
              <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
                <span className="border-primary/30 text-primary group-hover:bg-primary/10 flex h-9 w-9 items-center justify-center rounded-full border font-mono text-xs font-[500] transition-all duration-300 sm:h-10 sm:w-10 sm:text-sm">
                  {step.step}
                </span>
                <div className="bg-border h-px flex-1" />
              </div>
              <h3 className="font-heading font-700 mb-2 text-lg tracking-tight sm:mb-3 sm:text-xl">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
