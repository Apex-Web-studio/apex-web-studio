"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealOptions {
  splitBy?: "words" | "chars";
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  ease?: string;
  y?: string | number;
  onMount?: boolean;
}

export function useTextReveal<T extends HTMLElement>(
  options: TextRevealOptions = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const text = el.textContent || "";
    const splitBy = options.splitBy ?? "words";

    const units = splitBy === "chars" ? text.split("") : text.split(" ");

    el.innerHTML = units
      .map((unit) => {
        if (unit === " " || unit === "") return " ";
        const display = splitBy === "chars" && unit === " " ? "&nbsp;" : unit;
        return `<span class="inline-block overflow-hidden"><span class="inline-block" style="will-change:transform">${display}</span></span>`;
      })
      .join(splitBy === "chars" ? "" : " ");

    const innerSpans = el.querySelectorAll("span > span");

    const ctx = gsap.context(() => {
      gsap.from(innerSpans, {
        y: options.y ?? "105%",
        duration: options.duration ?? 0.7,
        stagger: options.stagger ?? (splitBy === "chars" ? 0.02 : 0.04),
        delay: options.delay ?? 0,
        ease: options.ease ?? "power3.out",
        force3D: true,
        ...(options.onMount
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: options.start ?? "top 85%",
                toggleActions: "play none none none",
              },
            }),
      });
    }, el);

    return () => {
      ctx.revert();
      el.textContent = text;
    };
  }, [
    options.splitBy,
    options.stagger,
    options.duration,
    options.delay,
    options.start,
    options.ease,
    options.y,
    options.onMount,
  ]);

  return ref;
}
