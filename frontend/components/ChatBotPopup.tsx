"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ChevronUp } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  time: string;
}

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const botReply = (input: string) => {
  const t = input.toLowerCase();
  if (t.includes("price")) return "We offer flexible pricing plans based on your business goals.";
  if (t.includes("service")) return "We provide AI automation, marketing, and premium web solutions.";
  if (t.includes("contact")) return "You can contact us via email or our contact page.";
  return "Tell me more about your requirement.";
};

export default function ChatBotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsOpen(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "BotMate AI connected. How can I help you?",
          sender: "bot",
          time: getTime(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    const checkScroll = () => {
      if (window.pageYOffset > 500) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "user" as const,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: botReply(input),
        sender: "bot" as const,
        time: getTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-4">

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Back to Top"
          >
            <ChevronUp size={26} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            className="chat-container flex flex-col"
          >

            {/* HEADER */}
            <div className="chat-header">
              <div className="flex items-center gap-3">
                <img src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777281719/RoboDino_Telecaller_bhpv3t.png" className="w-10 h-10 object-contain" />
                <div>
                  <p className="text-white text-xs font-bold tracking-wider">
                    BOTMATE AI
                  </p>
                  <span className="text-green-400 text-[10px]">● Online</span>
                </div>
              </div>

              <button onClick={() => setIsOpen(false)}>
                <X size={18} className="text-white/40 hover:text-white" />
              </button>
            </div>

            {/* BODY */}
            <div ref={scrollRef} className="chat-body">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={m.sender === "bot" ? "bot-msg" : "user-msg"}
                >
                  {m.text}
                  <div className="msg-time">{m.time}</div>
                </div>
              ))}

              {typing && (
                <div className="bot-msg opacity-60">Typing...</div>
              )}
            </div>

            {/* INPUT */}
            <div className="chat-input">
              <div className="chat-input-box">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask BotMate..."
                />
                <button onClick={sendMessage} className="chat-send">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle"
      >
        <img src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777281719/RoboDino_Telecaller_bhpv3t.png" className="w-12 h-12 object-contain" />
      </button>

      {/* STYLES */}
      <style jsx>{`
        .chat-container {
          width: 360px;
          height: 520px;
          border-radius: 24px;
          overflow: hidden;
          background: #0a0f19;
          border: 1px solid rgba(0, 229, 255, 0.25);
          box-shadow: 0 0 30px rgba(0, 229, 255, 0.1);
          position: relative;
        }

        .chat-container::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.2;
        }

        .chat-header {
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .chat-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bot-msg {
          background: #1a1f29;
          padding: 10px 14px;
          border-radius: 16px;
          color: white;
          max-width: 80%;
        }

        .user-msg {
          background: #00e5ff;
          color: black;
          padding: 10px 14px;
          border-radius: 16px;
          align-self: flex-end;
          font-weight: 600;
        }

        .msg-time {
          font-size: 9px;
          opacity: 0.4;
          margin-top: 4px;
        }

        .chat-input {
          padding: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .chat-input-box {
          display: flex;
          gap: 10px;
          align-items: center;
          background: #1a1f29;
          border-radius: 14px;
          padding: 10px;
        }

        .chat-input-box input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          outline: none;
        }

        .chat-send {
          background: #00e5ff;
          border-radius: 10px;
          padding: 8px;
          color: black;
        }

        .chat-toggle {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: #0b0f14;
          border: 1px solid rgba(0,229,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .back-to-top-btn {
          width: 56px;
          height: 56px;
          background: rgba(0, 229, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 229, 255, 0.5);
          color: #00e5ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 15px rgba(0, 229, 255, 0.1);
        }

        .back-to-top-btn::before {
          content: "";
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 229, 255, 0.2),
            transparent
          );
          animation: scanline 3s linear infinite;
        }

        @keyframes scanline {
          0% { top: -100%; }
          100% { top: 200%; }
        }

        .back-to-top-btn:hover {
          background: rgba(0, 229, 255, 0.2);
          transform: translateY(-8px) rotate(90deg);
          border-color: #00e5ff;
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.4);
        }

        .back-to-top-btn:hover :global(svg) {
          transform: rotate(-90deg);
        }
      `}</style>
    </div>
  );
}