"use client";

import {
  useEffect,
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}

let globalLenis: Lenis | null = null;

function subscribeLenis(callback: () => void) {
  const id = setInterval(callback, 100);
  return () => clearInterval(id);
}

function getLenisSnapshot() {
  return globalLenis;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  const lenis = useSyncExternalStore(
    subscribeLenis,
    getLenisSnapshot,
    () => null,
  );

  const init = useCallback(() => {
    if (initialized.current) return;
    initialized.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    globalLenis = new Lenis({
      autoRaf: false,
      lerp: prefersReducedMotion ? 1 : 0.08,
      smoothWheel: !prefersReducedMotion,
    });

    globalLenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      globalLenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
  }, []);

  useEffect(() => {
    init();

    return () => {
      if (globalLenis) {
        globalLenis.off("scroll", ScrollTrigger.update);
        globalLenis.destroy();
        globalLenis = null;
        initialized.current = false;
      }
    };
  }, [init]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
