import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";

export const metadata: Metadata = {
  title: "Pricing & Packages | BOTMATE - Scale Your Brand with AI",
  description: "Transparent pricing for digital marketing and AI growth packages. Choose the protocol that fits your business stage, from Starter to Enterprise.",
  keywords: ["Marketing Pricing", "AI Packages", "Digital Growth Plans", "BotMate Pricing"],
  alternates: {
    canonical: "https://botmate.in/packages",
  },
  openGraph: {
    title: "Pricing & Packages | BOTMATE",
    description: "Scalable AI-driven marketing solutions for every business stage.",
    url: "https://botmate.in/packages",
  },
};

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "BotMate Marketing Packages",
            "description": "Subscription-based digital marketing and social media packages.",
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "9999",
              "highPrice": "19999",
              "priceCurrency": "INR"
            }
          }),
        }}
      />
      <PackagesClient />
    </>
  );
}
