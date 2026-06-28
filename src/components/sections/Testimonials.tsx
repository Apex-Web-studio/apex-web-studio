"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { TESTIMONIALS } from "@/constants";
import { useTextReveal } from "@/hooks/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
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
        scale: 0.97,
        duration: 0.8,
        stagger: 0.15,
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
    <SectionWrapper id="testimonials">
      <div className="mb-10 sm:mb-14 md:mb-20">
        <span className="text-primary mb-2 block font-mono text-[10px] tracking-[0.15em] uppercase sm:mb-3 sm:text-xs">
          Testimonials
        </span>
        <h2
          ref={headingRef}
          className="font-heading font-700 max-w-lg tracking-[-0.02em]"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
            lineHeight: "1.05",
          }}
        >
          What our clients say.
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
      >
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.name}
            className="group border-border/50 bg-card hover:border-primary/20 relative rounded-xl border p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(103,117,224,0.04)] sm:p-8"
          >
            <Quote
              className="text-primary/20 mb-4 h-6 w-6 sm:mb-6 sm:h-8 sm:w-8"
              aria-hidden="true"
            />
            <p className="text-muted-foreground mb-6 text-xs leading-[1.7] sm:mb-8 sm:text-sm md:text-base">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-full font-mono text-[10px] font-[600] sm:h-10 sm:w-10 sm:text-xs">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-foreground text-sm font-[500]">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
