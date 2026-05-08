import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About BOTMATE | Leading AI Digital Agency",
  description: "Learn more about BotMate, our mission, and the team behind the most innovative AI-driven digital marketing agency in Mumbai.",
  alternates: {
    canonical: "https://botmate.in/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
