"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { FAQ_ITEMS } from "@/constants";
import { fadeInUp, viewportConfig } from "@/lib/animations";

export function FAQ() {
  return (
    <SectionWrapper id="faq">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center md:mb-20">
          <span className="text-primary mb-3 block font-mono text-xs tracking-[0.15em] uppercase">
            FAQ
          </span>
          <h2
            className="font-heading font-700 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "1.05",
            }}
          >
            Common questions.
          </h2>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
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
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
