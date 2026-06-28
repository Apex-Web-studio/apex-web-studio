"use client";

import { useSyncExternalStore } from "react";

function getScrollY() {
  return typeof window !== "undefined" ? window.scrollY : 0;
}

function getServerSnapshot() {
  return 0;
}

function subscribe(callback: () => void) {
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

export function useScrollPosition() {
  return useSyncExternalStore(subscribe, getScrollY, getServerSnapshot);
}
