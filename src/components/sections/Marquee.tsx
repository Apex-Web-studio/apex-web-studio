"use client";

import { MARQUEE_ITEMS } from "@/constants";

export function Marquee() {
  const items = MARQUEE_ITEMS.join("  •  ");
  const repeated = `${items}  •  ${items}  •  ${items}  •  `;

  return (
    <div className="border-border overflow-hidden border-b py-5 select-none motion-reduce:animate-none">
      <div
        aria-hidden="true"
        className="font-heading font-700 text-muted-foreground text-sm tracking-[0.1em] whitespace-nowrap uppercase md:text-base"
        style={{
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        {repeated}
      </div>
    </div>
  );
}
