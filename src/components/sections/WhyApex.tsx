"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { CounterAnimation } from "@/components/shared/CounterAnimation";
import { STATS, PHILOSOPHY } from "@/constants";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";

gsap.registerPlugin(ScrollTrigger);

export function WhyApex() {
  const statsRef = useRef<HTMLDivElement>(null);
  const bulletRef = useGsapReveal<HTMLDivElement>({
    y: 30,
    stagger: 0.08,
    duration: 0.6,
    children: true,
  });

  const headingRef = useTextReveal<HTMLHeadingElement>({
    splitBy: "words",
    stagger: 0.05,
    duration: 0.8,
  });

  useEffect(() => {
    const grid = statsRef.current;
    if (!grid) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(grid.children, {
        scale: 0.92,
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
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
    <SectionWrapper id="why-apex">
      <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="text-primary mb-2 block font-mono text-[10px] tracking-[0.15em] uppercase sm:mb-3 sm:text-xs">
            Why Apex
          </span>
          <h2
            ref={headingRef}
            className="font-heading font-700 mb-4 tracking-[-0.02em] sm:mb-6"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
              lineHeight: "1.05",
            }}
          >
            Built on craft, driven by vision.
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg text-sm leading-[1.7] sm:mb-8 sm:text-base md:text-lg">
            {PHILOSOPHY}
          </p>
          <div ref={bulletRef} className="space-y-3 sm:space-y-4">
            {[
              "Obsessive attention to every pixel and interaction",
              "Strategy-first approach grounded in real user research",
              "Modern tech stack optimized for performance and SEO",
              "Transparent process with weekly progress updates",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                <span className="text-muted-foreground text-xs sm:text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="border-border/50 bg-card flex flex-col items-center justify-center rounded-xl border p-5 text-center sm:p-8"
            >
              <span className="font-heading font-800 text-foreground mb-1 text-3xl tracking-tight sm:mb-2 sm:text-4xl md:text-5xl">
                <CounterAnimation value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-muted-foreground font-mono text-[9px] tracking-[0.1em] uppercase sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
