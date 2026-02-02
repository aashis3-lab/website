import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import TextureOverlay from "@/components/TextureOverlay";
import MouseParallax from "@/components/MouseParallax";
import ReactiveSand from "@/components/ReactiveSand";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-inter", // keeping variable name consistent with config
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aashi Shah | The Desert Horizon",
  description: "Entrepreneur, Builder, Storyteller.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-cream text-foreground overflow-x-hidden selection:bg-terracotta selection:text-white">
        <SmoothScroller>
          <ReactiveSand />
          <TextureOverlay />
          <CustomCursor />
          <Navbar />
          <MouseParallax>
            <main className="min-h-screen relative z-10">
              {children}
            </main>
          </MouseParallax>
          <Footer />
        </SmoothScroller>
      </body>
    </html>
  );
}
