import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BOTMATE | Premium AI Agency | Digital Marketing & Automation",
  description: "Accelerate your business with BotMate, a premium AI-driven digital marketing agency. We specialize in SEO, social media management, and custom AI automation solutions.",
  keywords: ["AI Agency", "Digital Marketing", "SEO", "Social Media Management", "Business Automation", "BotMate"],
  authors: [{ name: "BotMate Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://botmate.in",
    title: "BOTMATE | Premium AI Agency",
    description: "AI-driven growth strategies for the future of business.",
    siteName: "BotMate",
    images: [
      {
        url: "https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274515/hero-poster_p8qcmr.png",
        width: 1200,
        height: 630,
        alt: "BotMate - Premium AI Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOTMATE | Premium AI Agency",
    description: "AI-driven growth strategies for the future of business.",
    images: ["https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274515/hero-poster_p8qcmr.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

import ClientPopups from "@/components/ClientPopups";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#060a0f]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased bg-[#060a0f] text-white`}>
        <ClientPopups />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

