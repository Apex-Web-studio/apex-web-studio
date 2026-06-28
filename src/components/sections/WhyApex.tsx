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
        scale: 0.9,
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
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
    <SectionWrapper id="why-apex">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
            Why Apex
          </span>
          <h2
            ref={headingRef}
            className="font-heading font-700 mb-6 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "1.05",
            }}
          >
            Built on craft, driven by vision.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg text-base leading-[1.7] md:text-lg">
            {PHILOSOPHY}
          </p>
          <div ref={bulletRef} className="space-y-4">
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

        <div ref={statsRef} className="grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="border-border/50 bg-card flex flex-col items-center justify-center rounded-xl border p-8 text-center"
            >
              <span className="font-heading font-800 text-foreground mb-2 text-4xl tracking-tight md:text-5xl">
                <CounterAnimation value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-muted-foreground font-mono text-xs tracking-[0.1em] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
