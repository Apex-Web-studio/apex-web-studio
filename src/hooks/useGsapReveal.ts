"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  ease?: string;
  children?: boolean;
}

export function useGsapReveal<T extends HTMLElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const targets = options.children ? el.children : el;
    const from: gsap.TweenVars = {
      opacity: options.opacity ?? 0,
      y: options.y ?? 40,
    };
    if (options.x !== undefined) from.x = options.x;
    if (options.scale !== undefined) from.scale = options.scale;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...from,
        duration: options.duration ?? 0.8,
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0,
        ease: options.ease ?? "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [
    options.y,
    options.x,
    options.opacity,
    options.scale,
    options.duration,
    options.delay,
    options.stagger,
    options.start,
    options.ease,
    options.children,
  ]);

  return ref;
}
