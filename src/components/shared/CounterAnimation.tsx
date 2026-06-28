"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterAnimationProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function CounterAnimation({
  value,
  suffix = "",
  duration = 2000,
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    prefersReducedMotion ? value : 0,
  );

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let startTime: number | null = null;
    let frame: number;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}
