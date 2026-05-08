import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";

export const metadata: Metadata = {
  title: "Pricing & Packages | BOTMATE - Scale Your Brand",
  description: "Transparent pricing for digital marketing and AI growth packages. Choose the protocol that fits your business stage.",
  alternates: {
    canonical: "https://botmate.in/packages",
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
