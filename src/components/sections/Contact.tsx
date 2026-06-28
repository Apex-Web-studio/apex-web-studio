"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/constants";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function Contact() {
  const headingRef = useTextReveal<HTMLHeadingElement>({
    splitBy: "words",
    stagger: 0.05,
    duration: 0.9,
    ease: "power4.out",
  });

  const contentRef = useGsapReveal<HTMLDivElement>({
    y: 30,
    duration: 0.7,
    delay: 0.2,
  });

  return (
    <SectionWrapper id="contact" className="text-center">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "oklch(0.58 0.17 275)" }}
        />
      </div>

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8">
        <span className="text-primary font-mono text-xs tracking-[0.15em] uppercase">
          Get in Touch
        </span>

        <h2
          ref={headingRef}
          className="font-heading font-700 tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: "1.05" }}
        >
          Let&apos;s build something remarkable.
        </h2>

        <div ref={contentRef} className="flex flex-col items-center gap-8">
          <p className="text-muted-foreground max-w-md text-base leading-relaxed md:text-lg">
            Ready to elevate your digital presence? Reach out on Instagram —
            we&apos;d love to hear about your project.
          </p>

          <MagneticButton
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on Instagram ${INSTAGRAM_HANDLE}`}
            className="group bg-primary text-primary-foreground mt-4 items-center gap-3 rounded-full px-8 py-4 text-base font-[500] transition-all duration-300 hover:shadow-[0_0_40px_rgba(103,117,224,0.3)] md:px-10 md:py-5 md:text-lg"
          >
            <InstagramIcon size={20} />
            <span>{INSTAGRAM_HANDLE}</span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
