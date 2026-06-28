"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  trigger?: string;
}

export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const speed = options.speed ?? 80;
    const yVal = options.direction === "down" ? speed : -speed;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: yVal,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: options.trigger
            ? document.querySelector(options.trigger)
            : el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [options.speed, options.direction, options.trigger]);

  return ref;
}
