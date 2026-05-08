import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | BOTMATE - AI-Driven Digital Marketing",
  description: "Explore BotMate's core services: Digital Marketing, Web Development, and Social Media Management. Engineered for growth and powered by AI.",
  alternates: {
    canonical: "https://botmate.in/services",
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