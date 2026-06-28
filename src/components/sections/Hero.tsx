"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollIndicator } from "@/components/shared/ScrollIndicator";
import { TAGLINE, HERO_SUBTITLE } from "@/constants";
import { useParallax } from "@/hooks/useParallax";

gsap.registerPlugin(ScrollTrigger);

function splitIntoSpans(text: string): string {
  return text
    .split(" ")
    .map(
      (word) =>
        `<span class="inline-block overflow-hidden mr-[0.25em]"><span class="inline-block" style="will-change:transform">${word}</span></span>`,
    )
    .join("");
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const orb1 = useParallax<HTMLDivElement>({ speed: 60, direction: "up" });
  const orb2 = useParallax<HTMLDivElement>({ speed: 40, direction: "down" });

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const lines = heading.querySelectorAll("[data-hero-line]");
    lines.forEach((line) => {
      line.innerHTML = splitIntoSpans(line.textContent || "");
    });

    const allInnerSpans = heading.querySelectorAll("span > span");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 });

      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          allInnerSpans,
          {
            y: "110%",
            rotateX: 15,
            duration: 0.9,
            stagger: 0.035,
            ease: "power4.out",
            force3D: true,
          },
          "-=0.3",
        )
        .from(
          taglineRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        );

      gsap.to(sectionRef.current, {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "70% top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 md:px-8"
      aria-label="Hero"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
        aria-hidden="true"
      >
        <div
          ref={orb1}
          className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full opacity-[0.07] blur-[120px] will-change-transform"
          style={{ background: "oklch(0.58 0.17 275)" }}
        />
        <div
          ref={orb2}
          className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full opacity-[0.05] blur-[120px] will-change-transform"
          style={{ background: "oklch(0.58 0.12 300)" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center md:gap-8">
        <div ref={eyebrowRef} className="flex items-center gap-3">
          <span className="bg-primary h-[1px] w-8" aria-hidden="true" />
          <span className="text-primary font-mono text-xs tracking-[0.15em] uppercase">
            Digital Design Agency
          </span>
          <span className="bg-primary h-[1px] w-8" aria-hidden="true" />
        </div>

        <h1
          ref={headingRef}
          className="font-heading leading-[0.95] font-[800] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.75rem, 8vw, 7.5rem)" }}
        >
          <span data-hero-line>APEX WEB</span>
          <br />
          <span data-hero-line>STUDIO</span>
        </h1>

        <p
          ref={taglineRef}
          className="text-foreground max-w-xs text-lg font-[500] sm:text-xl md:max-w-sm md:text-2xl"
        >
          {TAGLINE}
        </p>

        <p
          ref={subtitleRef}
          className="text-muted-foreground max-w-sm text-sm sm:text-base md:max-w-lg md:text-lg"
        >
          {HERO_SUBTITLE}
        </p>
      </div>

      <div className="absolute bottom-10">
        <ScrollIndicator delay={3.2} />
      </div>

      <div
        className="via-border absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
