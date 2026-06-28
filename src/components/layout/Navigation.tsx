"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { INSTAGRAM_URL, NAV_LINKS } from "@/constants";

export function Navigation() {
  const scrollY = useScrollPosition();
  const isVisible =
    scrollY > (typeof window !== "undefined" ? window.innerHeight * 0.75 : 600);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Main navigation"
          className="border-border/50 bg-background/70 fixed top-4 right-4 left-4 z-50 mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-6 py-3 backdrop-blur-xl"
        >
          <a
            href="#"
            aria-label="Apex Web Studio — back to top"
            className="font-heading font-700 focus-visible:outline-ring text-sm tracking-[0.05em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            APEX
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground focus-visible:outline-ring text-sm font-[500] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="group bg-primary/10 text-primary hover:bg-primary/20 focus-visible:outline-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-[500] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <InstagramIcon size={14} />
            <span className="hidden sm:inline">Instagram</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
