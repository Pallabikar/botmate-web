import type { Metadata } from "next";
import GetStartedClient from "./GetStartedClient";

export const metadata: Metadata = {
  title: "Get Started | BOTMATE - Kickstart Your Growth",
  description: "Ready to accelerate your brand? Fill out the form or reach out to us directly to start your digital transformation with BotMate.",
  alternates: {
    canonical: "https://botmate.in/get-started",
  },
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}