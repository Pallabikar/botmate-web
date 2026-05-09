import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact BOTMATE | Get a Free AI Strategy Consultation",
  description: "Ready to scale? Contact BotMate today for a free consultation on how AI-driven marketing and automation can grow your business. Our experts are standing by.",
  keywords: ["Contact BotMate", "AI Consultation", "Digital Marketing Mumbai", "Business Growth"],
  alternates: {
    canonical: "https://botmate.in/contact",
  },
  openGraph: {
    title: "Contact BOTMATE | AI Strategy Consultation",
    description: "Start your brand's evolution with a free AI consultation.",
    url: "https://botmate.in/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
