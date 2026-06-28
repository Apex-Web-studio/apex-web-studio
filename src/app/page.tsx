"use client";

import { LenisProvider } from "@/components/providers/LenisProvider";
import { PageLoader } from "@/components/shared/PageLoader";
import { MouseGlow } from "@/components/shared/MouseGlow";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { WhyApex } from "@/components/sections/WhyApex";
import { Process } from "@/components/sections/Process";
import { Technologies } from "@/components/sections/Technologies";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <LenisProvider>
      <PageLoader>
        <ScrollProgress />
        <MouseGlow />
        <Navigation />
        <main id="main-content">
          <Hero />
          <Marquee />
          <Work />
          <Services />
          <WhyApex />
          <Process />
          <Technologies />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </PageLoader>
    </LenisProvider>
  );
}
