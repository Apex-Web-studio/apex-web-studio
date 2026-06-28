"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollIndicator } from "@/components/shared/ScrollIndicator";
import { TAGLINE, HERO_SUBTITLE } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

function splitIntoSpans(text: string): string {
  return text
    .split(" ")
    .map(
      (word) =>
        `<span class="inline-block overflow-hidden mr-[0.2em]"><span class="inline-block" style="will-change:transform">${word}</span></span>`,
    )
    .join("");
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const section = sectionRef.current;
    if (!heading || !section) return;

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
            duration: 0.9,
            stagger: 0.04,
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

      gsap.to(section, {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
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
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 md:px-8"
      aria-label="Hero"
    >
      {/* Gradient orbs - contained within section overflow-hidden */}
      <div
        className="pointer-events-none absolute inset-0 motion-reduce:hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-[0.08] blur-[100px] will-change-transform sm:h-96 sm:w-96 md:-top-48 md:-right-48 md:h-[500px] md:w-[500px]"
          style={{
            background: "oklch(0.58 0.17 275)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full opacity-[0.05] blur-[100px] will-change-transform sm:h-80 sm:w-80 md:-bottom-48 md:-left-48 md:h-[400px] md:w-[400px]"
          style={{
            background: "oklch(0.58 0.12 300)",
            animation: "float 10s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5 text-center sm:gap-6 md:gap-8">
        <div ref={eyebrowRef} className="flex items-center gap-3">
          <span className="bg-primary h-[1px] w-6 sm:w-8" aria-hidden="true" />
          <span className="text-primary font-mono text-[10px] tracking-[0.15em] uppercase sm:text-xs">
            Digital Design Agency
          </span>
          <span className="bg-primary h-[1px] w-6 sm:w-8" aria-hidden="true" />
        </div>

        <h1
          ref={headingRef}
          className="font-heading leading-[0.95] font-[800] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7.5rem)" }}
        >
          <span data-hero-line>APEX WEB</span>
          <br />
          <span data-hero-line>STUDIO</span>
        </h1>

        <p
          ref={taglineRef}
          className="text-foreground max-w-[280px] text-base font-[500] sm:max-w-xs sm:text-lg md:max-w-sm md:text-2xl"
        >
          {TAGLINE}
        </p>

        <p
          ref={subtitleRef}
          className="text-muted-foreground max-w-[280px] text-xs sm:max-w-sm sm:text-sm md:max-w-lg md:text-lg"
        >
          {HERO_SUBTITLE}
        </p>
      </div>

      <div className="absolute bottom-8 sm:bottom-10">
        <ScrollIndicator delay={3.2} />
      </div>

      <div
        className="via-border absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
