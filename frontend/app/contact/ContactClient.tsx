"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { StaggerReveal, RevealItem, AnimatedText } from "@/components/AnimationSystem";

import dynamic from "next/dynamic";

const MorphBlob = dynamic(() => import("@/components/MorphBlob"), { ssr: false, loading: () => null });

/* ─────────────────────────────────────────────
   MORPHING BORDER CARD
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   MORPHING BORDER CARD
───────────────────────────────────────────── */
function MorphCard({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={`morph-card ${className}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40, borderRadius: "40px" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      animate={{ borderRadius: hovered ? "12px 32px 12px 32px" : "24px" }}
      style={{ minHeight: "inherit" }}
    >
      {children}
      <style jsx>{`
        .morph-card {
          background: rgba(4, 8, 15, 0.7);
          border: 1px solid rgba(0,229,255,0.1);
          position: relative; overflow: hidden;
          transition: border-color 0.4s, background 0.4s, box-shadow 0.4s;
        }
        .morph-card:hover {
          border-color: rgba(0,229,255,0.35);
          background: rgba(0,229,255,0.03);
          box-shadow: 0 0 40px rgba(0,229,255,0.06);
        }
      `}</style>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MORPHING LIQUID DIVIDER
───────────────────────────────────────────── */
function LiquidDivider() {
  return (
    <div className="liquid-div" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="rgba(0,229,255,0.04)">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,30 C360,60 720,0 1440,30 L1440,60 L0,60 Z;
              M0,20 C360,50 720,10 1440,40 L1440,60 L0,60 Z;
              M0,40 C360,10 720,50 1440,20 L1440,60 L0,60 Z;
              M0,30 C360,60 720,0 1440,30 L1440,60 L0,60 Z
            "
          />
        </path>
      </svg>
      <style jsx>{`
        .liquid-div { width: 100%; height: 60px; }
        .liquid-div svg { width: 100%; height: 100%; display: block; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MORPHING SVG ICON (replaces emoji)
───────────────────────────────────────────── */
function MorphIcon({ type }: { type: "email" | "phone" | "location" }) {
  const paths = {
    email: {
      a: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 L12,13 L2,6",
      b: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    phone: {
      a: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72",
      b: "M6.6 10.8c1 1.73 2.4 3.13 4.14 4.14l1.38-1.38a1.35 1.35 0 011.39-.33 15.5 15.5 0 004.86 1.56 1.36 1.36 0 011.13 1.36V18a1.36 1.36 0 01-1.48 1.35A21.3 21.3 0 013 3.65 1.36 1.36 0 014.35 2.2H6.6A1.36 1.36 0 017.96 3.33a15.5 15.5 0 001.56 4.86 1.35 1.35 0 01-.34 1.39z"
    },
    location: {
      a: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a1 1 0 110-2 1 1 0 010 2",
      b: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    }
  };
  const [toggled, setToggled] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setToggled(p => !p), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="morph-icon-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="morph-icon-svg">
        <path d={toggled ? paths[type].b : paths[type].a} style={{ transition: "d 0.8s ease" }}>
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values={`${paths[type].a};${paths[type].b};${paths[type].a}`}
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </path>
      </svg>
      <div className="icon-ring" />
      <style jsx>{`
        .morph-icon-wrap {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(0,229,255,0.06);
          border: 1px solid rgba(0,229,255,0.15);
          display: flex; align-items: center; justify-content: center;
          position: relative; margin: 0 auto 24px;
          animation: iconPulse 4s ease-in-out infinite;
        }
        @keyframes iconPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,229,255,0.15); }
          50% { box-shadow: 0 0 0 12px rgba(0,229,255,0); }
        }
        .morph-icon-svg { width: 28px; height: 28px; }
        .icon-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 1px dashed rgba(0,229,255,0.2);
          animation: ringRotate 8s linear infinite;
        }
        @keyframes ringRotate { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT INFO CARDS
───────────────────────────────────────────── */
const CONTACT_METHODS: { icon: "email" | "phone" | "location"; label: string; val: string; sub: string }[] = [
  { icon: "email",    label: "Email Us",  val: "contactbotmate@gmail.com", sub: "Support 24/7" },
  { icon: "phone",    label: "Call Us",   val: "+91 97772 09527",          sub: "Mon-Sat, 9am-7pm" },
  { icon: "location", label: "Visit Us",  val: "N6/354, Block N6, IRC Village, Nayapalli", sub: "Bhubaneswar, Odisha 751015" },
];

function ContactGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="contact-grid-section" ref={ref}>
      <MorphBlob className="blob-1" />
      <MorphBlob className="blob-2" />

      <div className="section-inner">
        <div className="heading-wrap">
          <motion.p
            className="pre-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >[ CONTACT METHODS ]</motion.p>

          <h2 className="section-heading">
            <AnimatedText text="Contact Methods" />
          </h2>

          <motion.div
            className="morph-underline"
            initial={{ scaleX: 0, borderRadius: "2px" }}
            animate={inView ? { scaleX: 1, borderRadius: "50px" } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />

          <motion.p
            className="section-sub"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            Direct channels to our core operations team.
          </motion.p>
        </div>

        <StaggerReveal stagger={0.15}>
          <div className="cards-grid">
            {CONTACT_METHODS.map((m, i) => (
              <RevealItem key={i}>
                <MorphCard className="info-card-inner">
                  <div className="card-glow" />
                  <MorphIcon type={m.icon} />
                  <h3 className="label">{m.label}</h3>
                  <div className="val-wrap">
                    <AnimatedText text={m.val} delay={0.4 + i * 0.1} />
                  </div>
                  <p className="sub">{m.sub}</p>
                  <motion.div
                    className="card-bottom-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                  />
                </MorphCard>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>

      <style jsx>{`
        .contact-grid-section {
          padding: 100px 0; background: #060a0f;
          position: relative; overflow: hidden;
        }
        .section-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }

        .heading-wrap { text-align: center; margin-bottom: 72px; }
        .pre-label { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.4); margin-bottom: 16px; }
        .section-heading {
          font-size: clamp(32px, 5vw, 52px); font-weight: 900;
          color: #fff; letter-spacing: -1px; margin-bottom: 16px;
        }
        .morph-underline {
          width: 60px; height: 3px; background: #00e5ff;
          margin: 0 auto 16px; transform-origin: center;
          box-shadow: 0 0 16px rgba(0,229,255,0.5);
        }
        .section-sub { color: rgba(255,255,255,0.4); font-size: 15px; }

        .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        :global(.info-card-inner) { padding: 48px 32px; text-align: center; }
        .card-glow {
          position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background: radial-gradient(ellipse at top, rgba(0,229,255,0.05) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.4s;
        }
        :global(.morph-card:hover) .card-glow { opacity: 1; }
        .label { font-size: 12px; font-weight: 700; color: #00e5ff; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 12px; }
        .val { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; line-height: 1.4; }
        .sub { font-size: 13px; color: rgba(255,255,255,0.35); }
        .card-bottom-line {
          position: absolute; bottom: 0; left: 10%; right: 10%; height: 2px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          transform-origin: left; border-radius: 2px;
        }

        @media (max-width: 960px) {
          .cards-grid { grid-template-columns: 1fr; }
          .section-inner { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}
/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ to, label }: { to: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-num">{count}+</span>
      <span className="stat-label">{label}</span>
      <style jsx>{`
        .stat-item { display: flex; flex-direction: column; align-items: center; }
        .stat-num { font-size: 32px; font-weight: 900; color: #00e5ff; line-height: 1; letter-spacing: -1px; }
        .stat-label { font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.15em; margin-top: 4px; font-family: monospace; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LEFT PANEL — Info + Stats
───────────────────────────────────────────── */
function LeftPanel() {
  const items = [
    { icon: "⬡", title: "Strategic Consultation", desc: "We analyze your goals and craft a bespoke digital roadmap." },
    { icon: "⬡", title: "AI-Powered Automation", desc: "Deploy intelligent bots that work for your brand 24/7." },
    { icon: "⬡", title: "Rapid Response", desc: "Our team responds within 24 hours with a tailored proposal." },
  ];

  return (
    <div className="left-panel">
      {/* Top badge */}
      <div className="panel-badge">
        <span className="badge-dot" />
        <span>BOTMATE OPERATIONS</span>
      </div>

      {/* Headline */}
      <h2 className="panel-title">
        Let&apos;s Build Something <span className="cyan">Extraordinary</span>
      </h2>
      <p className="panel-sub">
        Tell us your vision. We&apos;ll turn it into a precision-engineered digital experience.
      </p>

      {/* Feature list */}
      <div className="feature-list">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="feature-row"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="feature-icon-wrap">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <polygon points="8,1 15,4.5 15,11.5 8,15 1,11.5 1,4.5" stroke="#00e5ff" strokeWidth="1" fill="rgba(0,229,255,0.08)" />
              </svg>
            </div>
            <div>
              <p className="feature-title">{item.title}</p>
              <p className="feature-desc">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="panel-divider" />

      {/* Stats row */}
      <div className="stats-row">
        <Counter to={150} label="Clients Served" />
        <div className="stat-sep" />
        <Counter to={98} label="Satisfaction %" />
        <div className="stat-sep" />
        <Counter to={500} label="Projects Done" />
      </div>

      {/* Bottom decoration */}
      <div className="panel-grid-bg" aria-hidden="true" />

      <style jsx>{`
        .left-panel {
          position: relative; overflow: hidden;
          background: rgba(0,229,255,0.03);
          border: 1px solid rgba(0,229,255,0.12);
          border-radius: 24px;
          padding: 48px 40px;
          display: flex; flex-direction: column; gap: 0;
        }
        .panel-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: monospace; font-size: 10px; letter-spacing: 0.25em;
          color: #00e5ff; background: rgba(0,229,255,0.06);
          border: 1px solid rgba(0,229,255,0.15);
          padding: 6px 14px; border-radius: 50px;
          margin-bottom: 28px; width: fit-content;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00e5ff;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .panel-title {
          font-size: clamp(24px, 3vw, 34px); font-weight: 900;
          color: #fff; line-height: 1.2; margin-bottom: 14px; letter-spacing: -0.5px;
        }
        .cyan { color: #00e5ff; }
        .panel-sub { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.7; margin-bottom: 36px; }

        .feature-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 36px; }
        .feature-row { display: flex; gap: 14px; align-items: flex-start; }
        .feature-icon-wrap {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(0,229,255,0.06); border: 1px solid rgba(0,229,255,0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
        }
        .feature-title { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.85); margin-bottom: 3px; }
        .feature-desc { font-size: 12px; color: rgba(255,255,255,0.35); line-height: 1.6; }

        .panel-divider {
          height: 1px; background: linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent);
          margin-bottom: 32px;
        }
        .stats-row { display: flex; align-items: center; justify-content: space-between; }
        .stat-sep { width: 1px; height: 40px; background: rgba(0,229,255,0.1); }

        .panel-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse at bottom right, black 0%, transparent 60%);
          -webkit-mask-image: radial-gradient(ellipse at bottom right, black 0%, transparent 60%);
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING LABEL INPUT
───────────────────────────────────────────── */
function FloatInput({
  type = "text", name, label, required = false,
  as = "input", rows,
}: {
  type?: string; name: string; label: string;
  required?: boolean; as?: "input" | "textarea"; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const raised = focused || val.length > 0;
  const Tag = as as any;

  return (
    <div className={`float-field ${focused ? "is-focused" : ""} ${raised ? "is-raised" : ""}`}>
      <Tag
        type={type}
        name={name}
        id={name}
        required={required}
        rows={rows}
        value={val}
        onChange={(e: any) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="float-input"
        aria-label={label}
      />
      <label htmlFor={name} className="float-label">{label}</label>
      <motion.div
        className="float-underline"
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      />
      <style jsx>{`
        .float-field {
          position: relative;
          background: rgba(4, 8, 15, 0.6);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          transition: border-color 0.3s, background 0.3s;
        }
        .float-field.is-focused {
          border-color: rgba(0,229,255,0.4);
          background: rgba(0,229,255,0.02);
        }
        .float-input {
          width: 100%; background: transparent; border: none;
          padding: 26px 18px 10px;
          color: #fff; font-size: 15px; font-family: inherit;
          outline: none; resize: none; display: block;
          line-height: 1.5;
        }
        .float-label {
          position: absolute; left: 18px;
          font-size: 13px; color: rgba(255,255,255,0.3);
          pointer-events: none; transition: all 0.25s ease;
          top: 50%; transform: translateY(-50%);
        }
        textarea ~ .float-label { top: 20px; transform: none; }
        .is-raised .float-label, .is-focused .float-label {
          top: 10px; transform: none;
          font-size: 10px; letter-spacing: 0.1em;
          color: #00e5ff;
        }
        textarea.float-input { min-height: 120px; }
        .float-underline {
          position: absolute; bottom: 0; left: 10%; right: 10%; height: 2px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          transform-origin: center; border-radius: 2px;
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   THANK YOU OVERLAY
───────────────────────────────────────────── */
function ThankYouOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="ty-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="ty-box"
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Animated hex */}
        <div className="ty-hex">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <polygon points="32,4 60,18 60,46 32,60 4,46 4,18"
              stroke="#00e5ff" strokeWidth="1.5" fill="rgba(0,229,255,0.08)"
              style={{ animation: "hexSpin 6s linear infinite", transformOrigin: "center" }}
            />
            <text x="32" y="37" textAnchor="middle" fill="#00e5ff" fontSize="20" fontWeight="900">✓</text>
          </svg>
        </div>
        <h3 className="ty-title">Transmission Received</h3>
        <p className="ty-msg">Your message has been received. Our team will get back to you within <strong>24 hours</strong> with a tailored strategy proposal.</p>
        <button className="ty-btn" onClick={onClose}>← Send Another</button>
      </motion.div>
      <style jsx>{`
        .ty-overlay {
          position: absolute; inset: 0; z-index: 20;
          background: rgba(4,8,15,0.96);
          display: flex; align-items: center; justify-content: center;
          border-radius: inherit;
        }
        .ty-box {
          text-align: center; padding: 48px 40px; max-width: 400px;
        }
        .ty-hex { margin-bottom: 24px; }
        @keyframes hexSpin { to { transform: rotate(360deg); } }
        .ty-title { font-size: 26px; font-weight: 900; color: #fff; margin: 0 0 14px; }
        .ty-msg { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.7; margin: 0 0 32px; }
        .ty-msg strong { color: #00e5ff; }
        .ty-btn {
          padding: 12px 36px; border-radius: 50px;
          background: transparent; border: 1px solid rgba(0,229,255,0.3);
          color: #00e5ff; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: all 0.3s; font-family: inherit;
        }
        .ty-btn:hover { background: rgba(0,229,255,0.08); border-color: rgba(0,229,255,0.6); }
      `}</style>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   RIGHT PANEL — The Form
───────────────────────────────────────────── */
function RightPanel() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [showThanks, setShowThanks] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => { setStatus("done"); setShowThanks(true); }, 1800);
    setTimeout(() => setStatus("idle"), 3800);
  };

  const btnLabel = { idle: "Send Transmission", sending: "Transmitting…", done: "✓ Sent" };
  const btnColor = { idle: "#00e5ff", sending: "#0080aa", done: "#00ff9d" };

  return (
    <div className="right-panel">
      {/* Terminal-style top bar */}
      <div className="panel-topbar">
        <div className="tb-dots">
          <span /><span /><span />
        </div>
        <span className="tb-title">BOTMATE // SECURE.FORM v2.0</span>
        <div className="tb-status">
          <span className="tb-dot" />
          <span>LIVE</span>
        </div>
      </div>

      <form className="cf-form" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="form-row">
          <FloatInput name="name" label="Full Name" required />
          <FloatInput name="phone" type="tel" label="Phone Number" required />
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <FloatInput name="email" type="email" label="Email Address" required />
          <FloatInput name="company" label="Company / Business" required />
        </div>

        {/* Subject with selector chips */}
        <div className="subject-section">
          <p className="chips-label">Project Type</p>
          <div className="chips-row">
            {["AI Automation", "Web Design", "Chatbot", "Branding", "Other"].map((chip) => (
              <ChipSelector key={chip} label={chip} />
            ))}
          </div>
        </div>

        {/* Message */}
        <FloatInput name="message" label="Tell Us About Your Goal…" as="textarea" required />

        {/* Submit */}
        <motion.button
          type="submit"
          className="submit-btn"
          animate={{
            background: btnColor[status],
            borderRadius: status === "sending" ? "50px" : "12px",
          }}
          whileHover={{ scale: status === "idle" ? 1.01 : 1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          disabled={status !== "idle"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {btnLabel[status]}
            </motion.span>
          </AnimatePresence>
          {status === "sending" && <div className="btn-sweep" />}
        </motion.button>

        <p className="form-footnote">🔒 Encrypted & confidential. No spam, ever.</p>
      </form>

      <AnimatePresence>
        {showThanks && <ThankYouOverlay onClose={() => { setShowThanks(false); setStatus("idle"); }} />}
      </AnimatePresence>

      <style jsx>{`
        .right-panel {
          position: relative; overflow: hidden;
          background: rgba(4, 8, 15, 0.95);
          border: 1px solid rgba(0,229,255,0.12);
          border-radius: 24px;
        }

        /* Top bar */
        .panel-topbar {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 28px;
          border-bottom: 1px solid rgba(0,229,255,0.06);
          background: rgba(0,229,255,0.02);
        }
        .tb-dots { display: flex; gap: 6px; }
        .tb-dots span {
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(0,229,255,0.15); border: 1px solid rgba(0,229,255,0.25);
        }
        .tb-dots span:first-child { background: rgba(0,229,255,0.5); }
        .tb-title { flex: 1; text-align: center; font-family: monospace; font-size: 10px; letter-spacing: 0.2em; color: rgba(0,229,255,0.3); }
        .tb-status { display: flex; align-items: center; gap: 6px; font-family: monospace; font-size: 10px; color: #00ff9d; letter-spacing: 0.1em; }
        .tb-dot { width: 6px; height: 6px; border-radius: 50%; background: #00ff9d; animation: tbBlink 1.5s ease-in-out infinite; }
        @keyframes tbBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* Form */
        .cf-form { display: flex; flex-direction: column; gap: 18px; padding: 32px 36px 36px; position: relative; z-index: 2; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        /* Chips */
        .subject-section {}
        .chips-label { font-size: 10px; letter-spacing: 0.2em; color: rgba(0,229,255,0.4); font-family: monospace; margin-bottom: 10px; }
        .chips-row { display: flex; flex-wrap: wrap; gap: 8px; }

        /* Submit */
        .submit-btn {
          width: 100%; padding: 22px;
          border: none; font-size: 18px; font-weight: 800; font-family: inherit;
          letter-spacing: 0.05em; color: #060a0f;
          cursor: pointer; position: relative; overflow: hidden;
          box-shadow: 0 0 40px rgba(0,229,255,0.2);
          margin-top: 4px;
        }
        .submit-btn:disabled { cursor: not-allowed; }
        .btn-sweep {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: sweep 1s ease-in-out infinite;
        }
        @keyframes sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }

        .form-footnote { text-align: center; font-size: 11px; color: rgba(255,255,255,0.2); margin: 0; font-family: monospace; }

        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
          .cf-form { padding: 24px 20px; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHIP SELECTOR
───────────────────────────────────────────── */
function ChipSelector({ label }: { label: string }) {
  const [active, setActive] = useState(false);
  return (
    <motion.button
      type="button"
      className={`chip ${active ? "chip-active" : ""}`}
      onClick={() => setActive(p => !p)}
      whileTap={{ scale: 0.95 }}
      animate={{
        background: active ? "rgba(0,229,255,0.12)" : "rgba(255,255,255,0.04)",
        borderColor: active ? "rgba(0,229,255,0.5)" : "rgba(255,255,255,0.08)",
        color: active ? "#00e5ff" : "rgba(255,255,255,0.4)",
      }}
      transition={{ duration: 0.2 }}
    >
      {active && <span className="chip-check">✓ </span>}
      {label}
      <style jsx>{`
        .chip {
          padding: 7px 16px; border-radius: 50px;
          border: 1px solid; font-size: 12px; font-weight: 600;
          cursor: pointer; font-family: inherit; transition: none;
        }
        .chip-check { font-size: 10px; }
      `}</style>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────── */
function SectionHeading({ inView }: { inView: boolean }) {
  return (
    <div className="heading-block">
      <motion.p
        className="pre-label"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}
      >
        [ TRANSMISSION ]
      </motion.p>

      <h2 className="section-heading">
        <AnimatedText text="Send a Transmission" highlight="Transmission" />
      </h2>

      <motion.div
        className="morph-underline"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <motion.p
        className="section-sub"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        Tell us about your goals and we&apos;ll craft a precision strategy for you.
      </motion.p>

      <style jsx>{`
        .heading-block { text-align: center; margin-bottom: 64px; }
        .pre-label { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.4); margin-bottom: 16px; }
        .section-heading { font-size: clamp(32px, 5vw, 52px); font-weight: 900; color: #fff; letter-spacing: -1px; margin-bottom: 16px; }
        .morph-underline {
          width: 60px; height: 3px; background: #00e5ff;
          margin: 0 auto 16px; transform-origin: center;
          box-shadow: 0 0 16px rgba(0,229,255,0.5); border-radius: 50px;
        }
        .section-sub { color: rgba(255,255,255,0.4); font-size: 15px; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN CONTACT FORM SECTION
───────────────────────────────────────────── */
function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="form-section" ref={ref}>
      <LiquidDivider />

      <div className="section-inner">
        <SectionHeading inView={inView} />

        <div className="two-col">
          <motion.div
            className="col-left"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <LeftPanel />
          </motion.div>

          <motion.div
            className="col-right"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <RightPanel />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .form-section {
          padding: 40px 0 120px;
          background: #060a0f;
          position: relative; overflow: hidden;
        }
        .section-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 48px;
          position: relative; z-index: 2;
        }
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 960px) {
          .two-col { grid-template-columns: 1fr; }
          .section-inner { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAP SECTION — morphing frame
───────────────────────────────────────────── */
function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="map-section" ref={ref}>
      <LiquidDivider />
      <div className="section-inner">
        <div className="map-header">
          <motion.p className="pre-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            [ LOCATION ]
          </motion.p>
          <motion.h2
            className="map-title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ minHeight: "inherit" }}
          >
            Find Us <span className="cyan">Here</span>
          </motion.h2>
        </div>

        <motion.div
          className="map-shell"
          initial={{ opacity: 0, borderRadius: "60px", scale: 0.96 }}
          animate={inView ? { opacity: 1, borderRadius: "24px", scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* AR corner brackets on map */}
          <div className="map-br tl" /><div className="map-br tr" />
          <div className="map-br bl" /><div className="map-br br" />

          {/* Scanning line */}
          <div className="map-scan" aria-hidden="true" />

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.808!2d85.8138!3d20.2961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0x2ac1a3571e4cd5cd!2sN6%2F354%2C%20IRC%20Village%2C%20Nayapalli%2C%20Bhubaneswar%2C%20Odisha%20751015!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BotMate Office Location"
          />

          <div className="map-footer">
            <div className="mf-dot" />
            <span className="mf-text">N6/354, Block N6, IRC Village, Nayapalli, Bhubaneswar, Odisha 751015</span>
            <a href="https://maps.app.goo.gl/Vhenu8EPSTTZ4gKK9" target="_blank" rel="noopener noreferrer" className="mf-link" aria-label="Open office location in Google Maps">
              Open in Maps ↗
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .map-section { padding: 20px 0 120px; background: #060a0f; position: relative; }
        .section-inner { max-width: 1100px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }
        .map-header { text-align: center; margin-bottom: 48px; }
        .pre-label { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.4); margin-bottom: 12px; }
        .map-title { font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: #fff; margin: 0; }
        .cyan { color: #00e5ff; }

        .map-shell {
          position: relative; overflow: hidden;
          border: 1px solid rgba(0,229,255,0.15);
          box-shadow: 0 0 60px rgba(0,229,255,0.05);
        }

        .map-br { position: absolute; width: 22px; height: 22px; z-index: 3; }
        .tl { top: 10px; left: 10px; border-top: 2px solid #00e5ff; border-left: 2px solid #00e5ff; }
        .tr { top: 10px; right: 10px; border-top: 2px solid #00e5ff; border-right: 2px solid #00e5ff; }
        .bl { bottom: 48px; left: 10px; border-bottom: 2px solid #00e5ff; border-left: 2px solid #00e5ff; }
        .br { bottom: 48px; right: 10px; border-bottom: 2px solid #00e5ff; border-right: 2px solid #00e5ff; }

        .map-scan {
          position: absolute; left: 0; right: 0; height: 2px; z-index: 2;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent);
          animation: mapScan 5s linear infinite; pointer-events: none;
        }
        @keyframes mapScan { 0% { top: 0; } 100% { top: 100%; } }

        .map-footer {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 20px;
          background: rgba(0,229,255,0.03);
          border-top: 1px solid rgba(0,229,255,0.08);
        }
        .mf-dot { width: 8px; height: 8px; border-radius: 50%; background: #00e5ff; flex-shrink: 0; animation: mapDotBlink 2s ease-in-out infinite; }
        @keyframes mapDotBlink { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,229,255,0.4); } 50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(0,229,255,0); } }
        .mf-text { font-size: 13px; color: rgba(255,255,255,0.4); flex: 1; font-family: monospace; }
        .mf-link { font-size: 13px; color: #00e5ff; text-decoration: none; white-space: nowrap; font-weight: 600; transition: opacity 0.2s; }
        .mf-link:hover { opacity: 0.7; }

        @media (max-width: 768px) {
          .section-inner { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE HERO HEADER
───────────────────────────────────────────── */
function ContactHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blobX = useTransform(mouseX, [0, 1], [-30, 30]);
  const blobY = useTransform(mouseY, [0, 1], [-20, 20]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  };

  const title = "Connect with Us";
  const subtitle = "Ready to transform your digital strategy? Our operatives are standing by to assist with your brand's evolution.";

  return (
    <section className="hero" ref={ref} onMouseMove={handleMouse}>
      {/* Parallax morphing blob */}
      <motion.div className="hero-blob" style={{ x: blobX, y: blobY }}>
        <MorphBlob />
      </motion.div>

      {/* Grid bg */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Liquid wave top */}
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="rgba(0,229,255,0.03)">
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z;
                M0,20 C240,60 480,20 720,60 C960,20 1200,60 1440,20 L1440,80 L0,80 Z;
                M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z
              "
            />
          </path>
        </svg>
      </div>

      <div className="hero-content">
        <motion.p className="pre-tag" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
          <span className="tag-bracket">[</span> INITIATE CONTACT <span className="tag-bracket">]</span>
        </motion.p>

        <h1 className="hero-title">
          <AnimatedText text={title} />
        </h1>

        <motion.div
          className="title-morph-line"
          initial={{ scaleX: 0, borderRadius: "2px" }}
          animate={inView ? { scaleX: 1, borderRadius: "50px" } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        />

        <div className="hero-sub-wrap">
          <AnimatedText text={subtitle} className="hero-sub" delay={0.8} />
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 55vh; background: #060a0f;
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid rgba(0,229,255,0.06);
        }
        .hero-blob { position: absolute; width: 700px; height: 700px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-wave { position: absolute; bottom: 0; left: 0; right: 0; height: 80px; }
        .hero-wave svg { width: 100%; height: 100%; display: block; }

        .hero-content { position: relative; z-index: 2; text-align: center; padding: 80px 48px; max-width: 860px; }

        .pre-tag { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.5); display: block; margin-bottom: 24px; }
        .tag-bracket { color: #00e5ff; }

        .hero-title {
          font-size: clamp(44px, 7vw, 88px); font-weight: 900;
          color: #fff; line-height: 1; margin-bottom: 16px; letter-spacing: -0.02em;
        }
        .title-morph-line {
          height: 3px; width: 180px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          margin: 0 auto 28px; transform-origin: center;
          box-shadow: 0 0 20px rgba(0,229,255,0.4);
        }
        .hero-sub { font-size: 18px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 620px; margin: 0 auto; }

        @media (max-width: 768px) {
          .hero-content { padding: 80px 24px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function ContactClient() {
  return (
    <main className="contact-main">
      <ContactHero />
      <ContactGrid />
      <ContactForm />
      <MapSection />
      <Footer />

      <style jsx global>{`
        body { background: #060a0f; margin: 0; }
        .contact-main { background: #060a0f; }
        * { box-sizing: border-box; }
      `}</style>
    </main>
  );
}