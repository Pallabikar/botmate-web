import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About BOTMATE | Leading AI Digital Agency in Mumbai",
  description: "Learn more about BotMate, our mission, and the team behind the most innovative AI-driven digital marketing agency in Mumbai. We engineer the future of digital growth.",
  keywords: ["About BotMate", "AI Agency Team", "Digital Marketing Mission", "Innovation Mumbai"],
  alternates: {
    canonical: "https://botmate.in/about",
  },
  openGraph: {
    title: "About BOTMATE | Leading AI Digital Agency",
    description: "Engineering the future of digital growth with AI and human intuition.",
    url: "https://botmate.in/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
