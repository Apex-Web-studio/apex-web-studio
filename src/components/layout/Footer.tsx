import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import {
  APP_NAME,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  NAV_LINKS,
} from "@/constants";

export function Footer() {
  return (
    <footer className="border-border/50 border-t" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14 md:px-8 md:py-16 lg:px-12 xl:px-16">
        <div className="mb-8 flex flex-col gap-8 sm:mb-12 sm:gap-10 md:flex-row md:justify-between">
          <div>
            <span className="font-heading font-700 mb-3 block text-base tracking-[0.05em] uppercase sm:mb-4 sm:text-lg">
              Apex Web Studio
            </span>
            <p className="text-muted-foreground max-w-xs text-xs leading-relaxed sm:text-sm">
              Award-caliber digital experiences crafted with precision,
              strategy, and obsessive attention to detail.
            </p>
          </div>

          <div className="flex gap-10 sm:gap-16">
            <div>
              <span className="text-muted-foreground mb-3 block font-mono text-[10px] tracking-[0.1em] uppercase sm:mb-4 sm:text-xs">
                Navigation
              </span>
              <nav
                aria-label="Footer navigation"
                className="flex flex-col gap-2 sm:gap-3"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground focus-visible:outline-ring text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <span className="text-muted-foreground mb-3 block font-mono text-[10px] tracking-[0.1em] uppercase sm:mb-4 sm:text-xs">
                Connect
              </span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on Instagram ${INSTAGRAM_HANDLE}`}
                className="group text-muted-foreground hover:text-foreground focus-visible:outline-ring inline-flex items-center gap-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:gap-2 sm:text-sm"
              >
                <InstagramIcon size={12} className="sm:h-3.5 sm:w-3.5" />
                <span>{INSTAGRAM_HANDLE}</span>
                <ArrowUpRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-3 sm:w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-border/50 text-muted-foreground flex flex-col items-center justify-between gap-3 border-t pt-6 text-[10px] sm:flex-row sm:gap-4 sm:pt-8 sm:text-xs">
          <span>
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </span>
          <span>Designed &amp; Developed by Apex</span>
        </div>
      </div>
    </footer>
  );
}
