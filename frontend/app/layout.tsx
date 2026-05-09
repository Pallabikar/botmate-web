import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en" style={{ backgroundColor: '#060a0f' }}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { background-color: #060a0f !important; color: #ffffff !important; }
        ` }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`} style={{ backgroundColor: '#060a0f' }}>
        <CustomCursor />
        <Navbar />
        {children}
        <ChatBotPopup />
        <WhatsAppPopup />
      </body>
    </html>
  );
}
