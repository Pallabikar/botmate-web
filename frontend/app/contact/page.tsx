import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact BOTMATE | Get a Free AI Strategy Consultation",
  description: "Ready to scale? Contact BotMate today for a free consultation on how AI-driven marketing can grow your business.",
  alternates: {
    canonical: "https://botmate.in/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
