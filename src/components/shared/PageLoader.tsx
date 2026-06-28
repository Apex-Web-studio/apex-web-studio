"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const [isComplete, setIsComplete] = useState(prefersReducedMotion);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isComplete) return;

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => setIsComplete(true),
        });
      },
    });

    tl.from(nameRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(
        counter,
        {
          val: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current)
              counterRef.current.textContent = `${Math.floor(counter.val)}`;
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${counter.val / 100})`;
          },
        },
        0.3,
      )
      .to(
        counterRef.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
        },
        "+=0.1",
      );

    return () => {
      tl.kill();
    };
  }, [isComplete]);

  return (
    <>
      {!isComplete && (
        <div
          ref={loaderRef}
          className="bg-background fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          <span
            ref={nameRef}
            className="font-heading font-700 text-foreground mb-8 text-sm tracking-[0.25em] uppercase"
          >
            Apex Web Studio
          </span>

          <div className="bg-border/40 relative h-[1px] w-48 overflow-hidden">
            <div
              ref={barRef}
              className="bg-primary absolute inset-y-0 left-0 w-full origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <span
            ref={counterRef}
            className="text-muted-foreground mt-4 font-mono text-xs tabular-nums"
          >
            0
          </span>
        </div>
      )}

      <div
        style={{
          opacity: isComplete ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
