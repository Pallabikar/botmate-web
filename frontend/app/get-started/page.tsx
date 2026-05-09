import type { Metadata } from "next";
import GetStartedClient from "./GetStartedClient";

export const metadata: Metadata = {
  title: "Get Started | BOTMATE - Kickstart Your Brand's Growth",
  description: "Ready to accelerate your brand? Fill out the form or reach out to us directly to start your digital transformation with BotMate. Join the elite brands scaling with AI.",
  keywords: ["Get Started BotMate", "Business Transformation", "AI Growth Strategy", "Marketing Onboarding"],
  alternates: {
    canonical: "https://botmate.in/get-started",
  },
  openGraph: {
    title: "Get Started | BOTMATE",
    description: "Start your digital transformation journey with Mumbai's leading AI agency.",
    url: "https://botmate.in/get-started",
  },
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}