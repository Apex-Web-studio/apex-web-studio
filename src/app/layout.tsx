import type { Metadata } from "next";
import { Syne, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://apexwebstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Apex Web Studio — We design websites that win",
    template: "%s | Apex Web Studio",
  },
  description:
    "Apex Web Studio is a digital design agency crafting award-caliber websites, brand identities, and digital experiences with precision, strategy, and obsessive attention to detail.",
  keywords: [
    "web design agency",
    "digital design",
    "brand identity",
    "UI/UX design",
    "frontend development",
    "web development",
    "design studio",
    "Apex Web Studio",
  ],
  authors: [{ name: "Apex Web Studio" }],
  creator: "Apex Web Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Apex Web Studio",
    title: "Apex Web Studio — We design websites that win",
    description:
      "Award-caliber digital experiences crafted with precision, strategy, and obsessive attention to detail.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Apex Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Web Studio — We design websites that win",
    description:
      "Award-caliber digital experiences crafted with precision, strategy, and obsessive attention to detail.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Apex Web Studio",
              url: siteUrl,
              description:
                "Digital design agency crafting award-caliber websites, brand identities, and digital experiences.",
              sameAs: ["https://www.instagram.com/apexwebstudio2026/?hl=en"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://www.instagram.com/apexwebstudio2026/?hl=en",
              },
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
