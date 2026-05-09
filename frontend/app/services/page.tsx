import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | BOTMATE - AI-Driven Digital Marketing & Web Dev",
  description: "Explore BotMate's premium services: AI-driven Digital Marketing, High-Performance Web Development, and Viral Social Media Management. Engineered for scalable growth.",
  keywords: ["AI Marketing", "Next.js Development", "Social Media Growth", "Automation", "BotMate Services"],
  alternates: {
    canonical: "https://botmate.in/services",
  },
  openGraph: {
    title: "Our Services | BOTMATE",
    description: "AI-driven digital solutions engineered for growth.",
    url: "https://botmate.in/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Digital Marketing",
            "provider": {
              "@type": "Organization",
              "name": "BotMate"
            },
            "description": "Comprehensive digital marketing solutions including SEO, PPC, and Social Media Management.",
            "areaServed": "Mumbai, India",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Marketing Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Search Engine Optimization"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Social Media Management"
                  }
                }
              ]
            }
          }),
        }}
      />
      <ServicesClient />
    </>
  );
}