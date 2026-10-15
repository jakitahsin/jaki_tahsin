import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

export const viewport: Viewport = {
  themeColor: "#101010",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jakitahsin.com"),
  title: {
    default: "Jaki Tahsin — Graphic Designer & Visual Communicator",
    template: "%s | Jaki Tahsin",
  },
  description:
    "Portfolio of Jaki Tahsin, Graphic Designer & Visual Communicator based in Dhaka, Bangladesh. Specializing in brand identity, high-visibility outdoor media, editorial publications, and strategic digital campaigns.",
  keywords: [
    "Jaki Tahsin",
    "Graphic Designer Bangladesh",
    "Brand Identity Designer Dhaka",
    "Visual Communicator",
    "Logo Folio",
    "Outdoor Billboard Design",
    "Print and Editorial Design",
    "Social Media Campaigns",
  ],
  authors: [{ name: "Jaki Tahsin", url: "https://jakitahsin.com" }],
  creator: "Jaki Tahsin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jakitahsin.com",
    siteName: "Jaki Tahsin Portfolio",
    title: "Jaki Tahsin — Graphic Designer & Visual Communicator",
    description:
      "Making ideas impossible to ignore. Strategic visual identity, large-scale outdoor campaigns, editorial publications, and creative direction.",
    images: [
      {
        url: "/assets/portrait.webp",
        width: 1200,
        height: 630,
        alt: "Jaki Tahsin — Graphic Designer & Visual Communicator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaki Tahsin — Graphic Designer & Visual Communicator",
    description:
      "Strategic visual identity, large-scale outdoor campaigns, editorial publications, and creative direction from Bangladesh.",
    images: ["/assets/portrait.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian text-warm antialiased selection:bg-lime selection:text-obsidian flex flex-col min-h-screen">
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-lime focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:font-heading focus:text-obsidian"
        >
          Skip to main content
        </a>

        {/* Subtle Editorial Noise Texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Custom Interactive Cursor (Desktop) */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
