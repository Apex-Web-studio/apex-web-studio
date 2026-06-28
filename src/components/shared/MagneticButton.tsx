"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
  "aria-label": ariaLabel,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  function handleMouse(e: React.MouseEvent) {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
  }

  const Component = href ? "a" : "div";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
    >
      <Component
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={cn(
          "focus-visible:outline-ring inline-flex cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2",
          className,
        )}
      >
        {children}
      </Component>
    </motion.div>
  );
}
