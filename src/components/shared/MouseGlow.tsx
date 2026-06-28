"use client";

import { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Disable on mobile/touch devices and reduced motion
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isTouchDevice || prefersReducedMotion) {
      glow.style.display = "none";
      return;
    }

    let animationFrame: number;

    // Current interpolated position
    let cx = 0;
    let cy = 0;

    // Target position (raw mouse)
    let tx = 0;
    let ty = 0;

    // Previous frame position for velocity calculation
    let px = 0;
    let py = 0;

    // Current interpolated scale/opacity values
    let currentScaleX = 1;
    let currentScaleY = 1;
    let currentOpacity = 0.15;

    // Whether the mouse has entered the window
    let hasEntered = false;

    const SIZE = 500;
    const HALF = SIZE / 2;
    const LERP = 0.07;
    const SCALE_LERP = 0.06;
    const OPACITY_LERP = 0.04;

    function animate() {
      if (!glow) return;

      // Smooth position interpolation (elastic lag)
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;

      // Velocity = distance between current and previous frame
      const vx = cx - px;
      const vy = cy - py;
      const speed = Math.sqrt(vx * vx + vy * vy);

      // Store for next frame
      px = cx;
      py = cy;

      // --- Velocity-based stretch ---
      // Stretch in movement direction, compress perpendicular
      const maxStretch = 0.35;
      const stretchAmount = Math.min(speed / 60, maxStretch);
      const angle = Math.atan2(vy, vx);

      // Target scales: stretch along movement axis
      const targetScaleX = 1 + stretchAmount;
      const targetScaleY = 1 - stretchAmount * 0.4;

      // Smooth interpolation back to circle
      currentScaleX += (targetScaleX - currentScaleX) * SCALE_LERP;
      currentScaleY += (targetScaleY - currentScaleY) * SCALE_LERP;

      // --- Dynamic opacity: brighter when moving, softer when idle ---
      const targetOpacity = 0.15 + Math.min(speed / 80, 0.1);
      currentOpacity += (targetOpacity - currentOpacity) * OPACITY_LERP;

      // Apply transform: translate + rotate toward movement + stretch
      const angleDeg = angle * (180 / Math.PI);

      glow.style.transform =
        `translate3d(${cx - HALF}px, ${cy - HALF}px, 0) ` +
        `rotate(${angleDeg}deg) ` +
        `scale(${currentScaleX}, ${currentScaleY})`;
      glow.style.opacity = `${currentOpacity}`;

      animationFrame = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;

      if (!hasEntered) {
        // Snap to first position to avoid animating from 0,0
        cx = tx;
        cy = tx;
        px = tx;
        py = ty;
        hasEntered = true;
        if (glow) glow.style.opacity = "0.15";
      }
    }

    function handleMouseLeave() {
      if (glow) glow.style.opacity = "0";
    }

    function handleMouseEnter(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      cx = tx;
      cy = ty;
      px = tx;
      py = ty;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] hidden lg:block"
      style={{
        width: 500,
        height: 500,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at center, rgba(138, 180, 255, 0.45), rgba(255, 255, 255, 0.15) 40%, transparent 70%)",
        filter: "blur(60px)",
        opacity: 0,
        willChange: "transform, opacity",
      }}
    />
  );
}
