"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { FAQ_ITEMS } from "@/constants";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function FAQ() {
  const headingRef = useTextReveal<HTMLHeadingElement>({
    splitBy: "words",
    stagger: 0.05,
    duration: 0.8,
  });

  const accordionRef = useGsapReveal<HTMLDivElement>({
    y: 40,
    duration: 0.8,
    ease: "power3.out",
  });

  return (
    <SectionWrapper id="faq">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center md:mb-20">
          <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
            FAQ
          </span>
          <h2
            ref={headingRef}
            className="font-heading font-700 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "1.05",
            }}
          >
            Common questions.
          </h2>
        </div>

        <div ref={accordionRef}>
          <Accordion className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} className="border-border/50">
                <AccordionTrigger className="py-5 text-left font-[500] tracking-tight hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionWrapper>
  );
}
