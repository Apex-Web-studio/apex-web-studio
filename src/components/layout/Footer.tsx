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
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-12 xl:px-16">
        <div className="mb-12 flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <span className="font-heading font-700 mb-4 block text-lg tracking-[0.05em] uppercase">
              Apex Web Studio
            </span>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Award-caliber digital experiences crafted with precision,
              strategy, and obsessive attention to detail.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <span className="text-muted-foreground mb-4 block font-mono text-xs tracking-[0.1em] uppercase">
                Navigation
              </span>
              <nav
                aria-label="Footer navigation"
                className="flex flex-col gap-3"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground focus-visible:outline-ring text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <span className="text-muted-foreground mb-4 block font-mono text-xs tracking-[0.1em] uppercase">
                Connect
              </span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on Instagram ${INSTAGRAM_HANDLE}`}
                className="group text-muted-foreground hover:text-foreground focus-visible:outline-ring inline-flex items-center gap-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <InstagramIcon size={14} />
                <span>{INSTAGRAM_HANDLE}</span>
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-border/50 text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </span>
          <span>Designed &amp; Developed by Apex</span>
        </div>
      </div>
    </footer>
  );
}
