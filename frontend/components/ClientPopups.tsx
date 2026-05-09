"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const WhatsAppPopup = dynamic(() => import("@/components/WhatsAppPopup"), { ssr: false });
const ChatBotPopup = dynamic(() => import("@/components/ChatBotPopup"), { ssr: false });

export default function ClientPopups() {
  return (
    <>
      <CustomCursor />
      <ChatBotPopup />
      <WhatsAppPopup />
    </>
  );
}
