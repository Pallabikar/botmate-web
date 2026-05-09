import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
};

import CustomCursor from "@/components/CustomCursor";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import ChatBotPopup from "@/components/ChatBotPopup";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CustomCursor />
        <Navbar />
        {children}
        <ChatBotPopup />
        <WhatsAppPopup />
      </body>
    </html>
  );
}
