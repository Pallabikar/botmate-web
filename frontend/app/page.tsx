import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "BOTMATE | Best Digital Marketing Agency in Mumbai",
  description: "Accelerate your growth with BotMate. We specialize in AI-driven SEO, Social Media, and Performance Marketing for businesses in Mumbai and beyond.",
  alternates: {
    canonical: "https://botmate.in",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BotMate",
            "url": "https://botmate.in",
            "logo": "https://botmate.in/logo.png",
            "description": "AI-powered digital marketing agency specializing in SEO, social media, and business growth.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Mumbai",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://instagram.com/botmate",
              "https://linkedin.com/company/botmate"
            ]
          }),
        }}
      />
      <HomeClient />
    </>
  );
}
