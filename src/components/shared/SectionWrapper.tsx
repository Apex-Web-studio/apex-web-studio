"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={cn(
        "relative py-20 md:py-28 lg:py-32 xl:py-40",
        !fullWidth && "mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12 xl:px-16",
        className,
      )}
    >
      {children}
    </motion.section>
  );
}
