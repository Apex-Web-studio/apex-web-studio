"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TAGLINE, HERO_SUBTITLE } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into individual character spans wrapped in overflow-hidden containers.
 * Structure: <span.overflow-hidden><span.char>{char}</span></span>
 * Spaces become non-breaking to preserve word spacing.
 */
function splitChars(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent || "";
  el.innerHTML = text
    .split("")
    .map((char) => {
      if (char === " ")
        return '<span class="inline-block w-[0.25em]">&nbsp;</span>';
      return `<span class="inline-block overflow-hidden"><span class="inline-block" data-char style="will-change:transform,opacity,filter">${char}</span></span>`;
    })
    .join("");
  return Array.from(el.querySelectorAll("[data-char]"));
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const eyebrowLineLeft = useRef<HTMLSpanElement>(null);
  const eyebrowLineRight = useRef<HTMLSpanElement>(null);
  const eyebrowText = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const floatI = useRef<HTMLSpanElement>(null);
  const floatX = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const section = sectionRef.current;
    if (!heading || !section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // --- Split heading into individual characters ---
    const lines = heading.querySelectorAll<HTMLElement>("[data-hero-line]");
    const allChars: HTMLSpanElement[] = [];
    lines.forEach((line) => {
      allChars.push(...splitChars(line));
    });

    const ctx = gsap.context(() => {
      // ===================================================
      // MASTER ENTRANCE TIMELINE
      // Delay accounts for PageLoader (~2.5s total)
      // ===================================================
      const master = gsap.timeline({ delay: 2.6 });

      // --- Phase 1: Background orbs fade in and scale up ---
      master.fromTo(
        [orb1Ref.current, orb2Ref.current],
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: (i) => (i === 0 ? 0.08 : 0.05),
          duration: 1.8,
          stagger: 0.3,
          ease: "power2.out",
          force3D: true,
        },
        0,
      );

      // --- Phase 2: Eyebrow lines draw in from center ---
      master.fromTo(
        [eyebrowLineLeft.current, eyebrowLineRight.current],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power3.out",
          force3D: true,
        },
        0.2,
      );

      // --- Phase 2b: Eyebrow text fades in ---
      master.fromTo(
        eyebrowText.current,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          force3D: true,
        },
        0.4,
      );

      // --- Phase 3: Letter-by-letter reveal (the hero moment) ---
      // Each char slides up from below, fades in, and blur dissolves
      master.fromTo(
        allChars,
        {
          y: "100%",
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.025,
          ease: "power4.out",
          force3D: true,
        },
        0.6,
      );

      // --- Phase 4: Tagline slides up and fades in ---
      master.fromTo(
        taglineRef.current,
        { opacity: 0, y: 25, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
        },
        "-=0.2",
      );

      // --- Phase 5: Subtitle fades in ---
      master.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
        },
        "-=0.5",
      );

      // --- Phase 6: Scroll indicator appears ---
      master.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
        },
        "-=0.3",
      );

      // --- Phase 7: Floating decorative letters fade in ---
      master.fromTo(
        [floatI.current, floatX.current],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          force3D: true,
        },
        "-=0.6",
      );

      // ===================================================
      // 3D INLINE LETTER ROTATIONS
      // "X" in "APEX" — rotates on horizontal axis (rotateX)
      // "I" in "STUDIO" — rotates on vertical axis (rotateY)
      //
      // Physics: slow start → accelerate → fast spin → decelerate → stop
      // Custom ease via keyframes for natural momentum feel
      // Each letter loops independently with different timing offsets
      // ===================================================

      // Find the "X" in "APEX WEB" (line 0, char index 3: A-P-E-X)
      const line0Chars = lines[0]?.querySelectorAll("[data-char]");
      const letterX = line0Chars?.[3] as HTMLElement | undefined;

      // Find the "I" in "STUDIO" (line 1, char index 4: S-T-U-D-I)
      const line1Chars = lines[1]?.querySelectorAll("[data-char]");
      const letterI = line1Chars?.[4] as HTMLElement | undefined;

      // Apply 3D perspective to both letters' parent overflow wrappers
      [letterX, letterI].forEach((el) => {
        if (!el) return;
        const wrapper = el.parentElement;
        if (wrapper) {
          wrapper.style.perspective = "600px";
          wrapper.style.overflow = "visible";
        }
        el.style.transformStyle = "preserve-3d";
        el.style.backfaceVisibility = "hidden";
      });

      // "X" in APEX — rotateX (horizontal axis)
      // Spinning wheel: rest → accelerate → multiple fast spins → decelerate → rest
      if (letterX) {
        const xTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 2,
          delay: 4,
        });
        xTl
          // Phase 1: Accelerate from rest (0° → 360°, 1 full rotation while speeding up)
          .to(letterX, {
            rotateX: 360,
            duration: 1.2,
            ease: "power3.in",
            force3D: true,
          })
          // Phase 2: Full speed — 4 fast rotations (1440°) at constant velocity
          .to(letterX, {
            rotateX: "+=1440",
            duration: 1.4,
            ease: "none",
            force3D: true,
          })
          // Phase 3: Decelerate with inertia (1 final rotation winding down)
          .to(letterX, {
            rotateX: "+=360",
            duration: 1.4,
            ease: "power4.out",
            force3D: true,
          });
      }

      // "I" in STUDIO — rotateY (vertical axis)
      // Same spinning wheel physics, offset timing for organic feel
      if (letterI) {
        const iTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 2,
          delay: 5.5,
        });
        iTl
          // Phase 1: Accelerate from rest
          .to(letterI, {
            rotateY: 360,
            duration: 1.2,
            ease: "power3.in",
            force3D: true,
          })
          // Phase 2: Full speed — 4 fast rotations
          .to(letterI, {
            rotateY: "+=1440",
            duration: 1.4,
            ease: "none",
            force3D: true,
          })
          // Phase 3: Decelerate with inertia
          .to(letterI, {
            rotateY: "+=360",
            duration: 1.4,
            ease: "power4.out",
            force3D: true,
          });
      }

      // Decorative floating letters gentle drift
      if (floatX.current) {
        gsap.to(floatX.current, {
          y: -18,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          force3D: true,
        });
      }
      if (floatI.current) {
        gsap.to(floatI.current, {
          y: 18,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          force3D: true,
        });
      }

      // ===================================================
      // SCROLL INDICATOR BOUNCE (infinite, gentle)
      // ===================================================
      const arrow = scrollIndicatorRef.current?.querySelector("[data-arrow]");
      if (!arrow) return;
      gsap.to(arrow, {
        y: 6,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        force3D: true,
      });

      // ===================================================
      // PARALLAX FADE-OUT ON SCROLL
      // Hero content fades and shifts up as user scrolls
      // ===================================================
      gsap.to(section, {
        opacity: 0,
        y: -80,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "80% top",
          scrub: 1.5,
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
      {/* ---- Background gradient orbs ---- */}
      <div
        className="pointer-events-none absolute inset-0 motion-reduce:hidden"
        aria-hidden="true"
      >
        <div
          ref={orb1Ref}
          className="absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-0 blur-[100px] will-change-transform sm:h-96 sm:w-96 md:-top-48 md:-right-48 md:h-[500px] md:w-[500px]"
          style={{ background: "oklch(0.58 0.17 275)" }}
        />
        <div
          ref={orb2Ref}
          className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full opacity-0 blur-[100px] will-change-transform sm:h-80 sm:w-80 md:-bottom-48 md:-left-48 md:h-[400px] md:w-[400px]"
          style={{ background: "oklch(0.58 0.12 300)" }}
        />
      </div>

      {/* ---- Floating decorative 3D letters ---- */}
      <div
        className="pointer-events-none absolute inset-0 motion-reduce:hidden"
        aria-hidden="true"
        style={{ perspective: "800px" }}
      >
        {/* "I" — rotates horizontally (rotateX, barrel-roll) */}
        <span
          ref={floatI}
          className="font-heading font-800 text-primary/[0.04] absolute top-[15%] left-[8%] text-[8rem] leading-none opacity-0 select-none sm:text-[12rem] md:left-[12%] md:text-[16rem]"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          I
        </span>
        {/* "X" — rotates vertically (rotateY, coin-flip) */}
        <span
          ref={floatX}
          className="font-heading font-800 text-primary/[0.04] absolute right-[8%] bottom-[18%] text-[8rem] leading-none opacity-0 select-none sm:text-[12rem] md:right-[12%] md:text-[16rem]"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          X
        </span>
      </div>

      {/* ---- Hero content ---- */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center sm:gap-6 md:gap-8">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-3">
          <span
            ref={eyebrowLineLeft}
            className="bg-primary h-[1px] w-6 origin-right sm:w-8"
            aria-hidden="true"
            style={{ transform: "scaleX(0)" }}
          />
          <span
            ref={eyebrowText}
            className="text-primary font-mono text-[10px] tracking-[0.15em] uppercase opacity-0 sm:text-xs"
          >
            Digital Design Agency
          </span>
          <span
            ref={eyebrowLineRight}
            className="bg-primary h-[1px] w-6 origin-left sm:w-8"
            aria-hidden="true"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Main heading — split per character by GSAP */}
        <h1
          ref={headingRef}
          className="font-heading leading-[0.95] font-[800] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7.5rem)" }}
        >
          <span data-hero-line>APEX WEB</span>
          <br />
          <span data-hero-line>STUDIO</span>
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-foreground max-w-[280px] text-base font-[500] opacity-0 sm:max-w-xs sm:text-lg md:max-w-sm md:text-2xl"
        >
          {TAGLINE}
        </p>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-muted-foreground max-w-[280px] text-xs opacity-0 sm:max-w-sm sm:text-sm md:max-w-lg md:text-lg"
        >
          {HERO_SUBTITLE}
        </p>
      </div>

      {/* ---- Scroll indicator (GSAP-driven) ---- */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 flex flex-col items-center gap-2 opacity-0 sm:bottom-10"
        aria-hidden="true"
      >
        <span className="text-muted-foreground font-mono text-xs tracking-[0.08em] uppercase">
          Scroll
        </span>
        <div data-arrow>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* ---- Bottom gradient divider ---- */}
      <div
        className="via-border absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
