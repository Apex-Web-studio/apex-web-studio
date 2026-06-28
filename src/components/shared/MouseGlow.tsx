"use client";

import { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      glow.style.display = "none";
      return;
    }

    let animationFrame: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    function animate() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (glow) {
        glow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      }
      animationFrame = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] hidden h-[600px] w-[600px] rounded-full opacity-[0.03] blur-[100px] will-change-transform lg:block"
      style={{
        background:
          "radial-gradient(circle, oklch(0.58 0.17 275), transparent 70%)",
      }}
    />
  );
}
