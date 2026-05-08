"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { motion, useInView, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { AnimatedSection, AnimatedText, StaggerReveal, RevealItem } from "@/components/AnimationSystem";
import dynamic from "next/dynamic";

const HoloGrid = dynamic(() => import("@/components/HoloGrid"), { ssr: false, loading: () => null });
const MorphBlob = dynamic(() => import("@/components/MorphBlob"), { ssr: false, loading: () => null });

/* ─────────────────────────────────────────────
   GLITCH TEXT HOOK
───────────────────────────────────────────── */
function useGlitchText(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((letter, idx) => {
          if (idx < iter) return letter;
          if (letter === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iter >= text.length) clearInterval(interval);
      iter += 0.5;
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, text]);
  return display;
}

/* ─────────────────────────────────────────────
   AR CORNER BRACKETS
───────────────────────────────────────────── */
function ARBrackets({ size = 20, color = "#00e5ff", thickness = 2 }: { size?: number; color?: string; thickness?: number }) {
  const s = `${size}px`;
  const b = `${thickness}px solid ${color}`;
  return (
    <>
      <span style={{ position:"absolute",top:0,left:0,width:s,height:s,borderTop:b,borderLeft:b, pointerEvents: "none" }} />
      <span style={{ position:"absolute",top:0,right:0,width:s,height:s,borderTop:b,borderRight:b, pointerEvents: "none" }} />
      <span style={{ position:"absolute",bottom:0,left:0,width:s,height:s,borderBottom:b,borderLeft:b, pointerEvents: "none" }} />
      <span style={{ position:"absolute",bottom:0,right:0,width:s,height:s,borderBottom:b,borderRight:b, pointerEvents: "none" }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   HUD READOUT
───────────────────────────────────────────── */
function HUDReadout({ label, value }: { label: string; value: string }) {
  return (
    <div className="hud-readout">
      <span className="hud-label">{label}</span>
      <span className="hud-value">{value}</span>
      <style jsx>{`
        .hud-readout { display: flex; flex-direction: column; gap: 2px; }
        .hud-label { font-size: 9px; letter-spacing: 0.2em; color: rgba(0,229,255,0.4); text-transform: uppercase; font-family: monospace; }
        .hud-value { font-size: 13px; letter-spacing: 0.1em; color: #00e5ff; font-family: monospace; font-weight: 700; }
      `}</style>
    </div>
  );
}



/* ─────────────────────────────────────────────
   TRUSTED BY
───────────────────────────────────────────── */
const BRANDS = [
  "NovaTech","PixelForge","CloudNine","ZenithAI",
  "QuantumLeap","FusionLabs","ArcadeMedia","StellarBrands",
];

function TrustedBy() {
  const doubled = [...BRANDS, ...BRANDS];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section 
      className="trusted-section"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <motion.p 
        className="trusted-label"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        Trusted by 200+ brands worldwide
      </motion.p>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((b, i) => (
            <span key={i} className="marquee-brand">{b}</span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
const SERVICES = [
  
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: "DIGITAL MARKETING",
    desc: "Grow your audience, drive engagement, and build a loyal community across every platform.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    title: "Web Development",
    desc: "Lightning-fast, conversion-optimised websites and landing pages built for growth.",
  },

  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    title: "SOCIAL MEDIA MANAGEMENT",
    desc: "Scroll-stopping visuals, reels, and copy that tell your brand story and drive real action.",
  },
  
];

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const glitchedTitle = useGlitchText("What We Do", inView);

  return (
    <section className="section services-section optimized-bg-pattern" ref={ref}>
      <div className="grid-bg" />
      <MorphBlob className="blob-1" />
      <MorphBlob className="blob-2" />
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {glitchedTitle}
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="End-to-end digital solutions that drive measurable results." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <StaggerReveal stagger={0.15} delay={0.8}>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <RevealItem key={i}>
                <motion.div
                  className="service-card"
                  whileHover={{ 
                    y: -10,
                    rotateX: 5, rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,229,255,0.15)"
                  }}
                >
                  <ARBrackets size={14} color="rgba(0,229,255,0.3)" />
                  <div className="service-icon">{s.icon}</div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD (isolated — rules-of-hooks safe)
───────────────────────────────────────────── */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  const spring = useSpring(0, { damping: 30, stiffness: 100 });
  const display = useTransform(spring, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);

  return (
    <motion.div 
      className="stat-card" 
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <ARBrackets size={12} color="rgba(0,229,255,0.2)" />
      <motion.div className="stat-number">{display}</motion.div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

const STATS = [
  { value: 200, suffix: "+", label: "Clients Served" },
  { value: 98,  suffix: "%", label: "Retention Rate" },
  { value: 5,   suffix: "x", label: "Avg ROI"        },
  { value: 24,  suffix: "/7", label: "Support"       },
];

const FEATURES = [
  { title: "Tailored Strategies",    desc: "Every campaign is built around your unique goals, audience, and market — no cookie-cutter solutions." },
  { title: "Data-Driven Decisions",  desc: "We use real-time analytics and AI insights to continuously optimise your results." },
  { title: "Full Transparency",      desc: "Clear reporting, honest communication, and a team that treats your business like their own." },
];

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const glitchedTitle = useGlitchText("Why Choose Us", inView);

  return (
    <section className="section stats-section optimized-bg-pattern" ref={ref}>
      <div className="grid-bg" />
      <MorphBlob className="blob-3" />
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {glitchedTitle}
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="Numbers that speak louder than words." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <StaggerReveal stagger={0.1}>
          <div className="stats-grid">
            {STATS.map((s, i) => <RevealItem key={i}><StatCard {...s} /></RevealItem>)}
          </div>
        </StaggerReveal>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <motion.div 
              key={i} 
              className="feature-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <div className="feature-check">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <motion.polyline 
                    points="20 6 9 17 4 12"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
                  />
                </svg>
              </div>
              <div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROCESS
───────────────────────────────────────────── */
const STEPS = [
  { num: "01", title: "Discovery",  desc: "We deep-dive into your business, goals, and competitors to build a strong foundation." },
  { num: "02", title: "Strategy",   desc: "A custom digital roadmap is crafted, backed by data, insights, and market intelligence." },
  { num: "03", title: "Execution",  desc: "Our team launches every campaign, asset, and system with precision and creativity." },
  { num: "04", title: "Results",    desc: "We monitor, optimise, and scale continuously — so your brand keeps growing every month." },
];

function ProcessSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const glitchedTitle = useGlitchText("Our Process", inView);

  return (
    <section className="section process-section" ref={ref}>
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {glitchedTitle}
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText 
            text="A proven 4-step framework built for consistent, scalable growth." 
            className="section-sub"
            delay={0.6}
          />
        </div>
        <div className="process-container">
          {/* Animated SVG Path for connection */}
          <div className="process-svg-container" aria-hidden="true">
             <svg width="100%" height="40" viewBox="0 0 1000 40" preserveAspectRatio="none">
               <motion.path 
                 d="M0 20 Q 250 0, 500 20 T 1000 20"
                 fill="none"
                 stroke="url(#lineGradient)"
                 strokeWidth="2"
                 style={{ pathLength }}
               />
               <defs>
                 <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#00e5ff" />
                    <stop offset="100%" stopColor="transparent" />
                 </linearGradient>
               </defs>
             </svg>
          </div>

          <StaggerReveal stagger={0.2}>
            <div className="process-track">
              {STEPS.map((s, i) => (
                <RevealItem key={i} className="process-step">
                  <div className="process-circle">
                    <ARBrackets size={10} color="rgba(255,255,255,0.3)" />
                    {s.num}
                  </div>
                  <h3 className="process-title">{s.title}</h3>
                  <p className="process-desc">{s.desc}</p>
                </RevealItem>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </div>
      <style jsx>{`
        .process-container { position: relative; margin-top: 60px; }
        .process-svg-container { position: absolute; top: 40px; left: 0; right: 0; opacity: 0.3; pointer-events: none; }
        @media (max-width: 960px) { .process-svg-container { display: none; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRICING
───────────────────────────────────────────── */
const PLANS = [
  {
    name: "Starter Plan", price: "₹9,999", period: "/mo", popular: false,
    features: [
      "~ 10-20K Reach",
      "10 Creative Posts",
      "1 Shoot & Video",
      "Images & Video Content (User Provided)",
      "Profile Management",
      "Competitor Research",
      "ORM",
      "Performance Reports"
    ],
    cta: "Get Started",
  },
  {
    name: "Business Plan", price: "₹14,999", period: "/mo", popular: true,
    features: [
      "~ 30-40K Reach",
      "15 Creative Posts",
      "2 Shoots & Videos",
      "Images & Video Content (User Provided)",
      "Profile Management",
      "Competitor Research",
      "ORM",
      "Target Audience Targeting",
      "Google My Business (GMB)",
      "Performance Reports"
    ],
    cta: "Start Scaling",
  },
  {
    name: "Enterprise Plan", price: "₹19,999", period: "/mo", popular: false,
    features: [
      "~ 50-100K Reach",
      "20 Creative Posts",
      "3 Shoots & Videos",
      "Images & Video Content (User Provided)",
      "Profile Management",
      "Competitor Research",
      "ORM",
      "Target Audience Targeting",
      "Google My Business (GMB)",
      "Performance Reports"
    ],
    cta: "Maximize Growth",
  },
];

function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const glitchedTitle = useGlitchText("Choose Your Plan", inView);

  return (
    <section className="section pricing-section" ref={ref}>
      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {glitchedTitle}
          </motion.h2>
          <motion.div 
            className="cyan-underline" 
            initial={{ width: 0 }}
            animate={inView ? { width: 56 } : {}}
            transition={{ duration: 0.8 }}
          />
          <AnimatedText 
            text="No hidden fees. Cancel anytime. Results guaranteed." 
            className="section-sub"
            delay={0.4}
          />
        </div>
        <StaggerReveal stagger={0.15}>
          <div className="pricing-grid">
            {PLANS.map((p, i) => (
              <RevealItem key={i}>
                <motion.div 
                  className={`pricing-card${p.popular ? " pricing-popular" : ""}`}
                  whileHover={{ 
                    y: -10, 
                    rotateX: 2, rotateY: 2,
                    boxShadow: "0 25px 50px rgba(0,229,255,0.12)" 
                  }}
                >
                  <ARBrackets size={16} color="rgba(0,229,255,0.2)" />
                  {p.popular && <div className="popular-badge">MOST POPULAR</div>}
                  {p.popular && <div className="pulse-ring" />}
                  <p className="plan-name">{p.name}</p>
                  <div className="plan-price">
                    {p.price}<span className="plan-period">{p.period}</span>
                  </div>
                  <ul className="plan-features">
                    {p.features.map((f, j) => (
                      <li key={j} className="plan-feature">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/get-started" className={`plan-cta${p.popular ? " plan-cta-primary" : " plan-cta-outline"}`}>
                    {p.cta}
                  </a>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   Drop-in replacement for TestimonialsSection
   Same colors · Same data · New UI
───────────────────────────────────────────── */

const TESTIMONIALS = [
  { quote: "BotMate transformed our online presence completely. Our leads tripled in just 3 months. The team is incredibly professional and results-driven.", name: "Arjun Mehta",   company: "UrbanVibe Co.",      initials: "AM", result: "3× More Leads"      },
  { quote: "The AI chatbot they built for us handles 80% of our customer queries automatically. Absolute game-changer for our e-commerce store.",             name: "Priya Sharma",  company: "GlowBox India",      initials: "PS", result: "80% Queries Auto"   },
  { quote: "From SEO to paid ads, BotMate manages everything seamlessly. We're consistently hitting 5x ROAS on our campaigns now.",                          name: "Rohan Kapoor",  company: "TechNest Solutions", initials: "RK", result: "5× ROAS"            },
  { quote: "Their content team is phenomenal. Our Instagram grew by 40K followers in 4 months organically. Truly best-in-class.",                            name: "Sneha Joshi",   company: "Bloom Lifestyle",    initials: "SJ", result: "+40K Followers"     },
  { quote: "The new website they built for us loads in under 1.5 seconds and converts at 8%. Our old site was silently costing us a fortune.",               name: "Dev Nair",      company: "FinEdge Advisors",   initials: "DN", result: "8% Conversion Rate" },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const glitchedTitle = useGlitchText("What Clients Say", inView);

  /* auto-advance */
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  const prev = () => setActive((active - 1 + total) % total);
  const next = () => setActive((active + 1) % total);

  return (
    <section className="section testi-section" ref={ref}>
      <div className="section-inner">

        {/* ── HEADER ── */}
        <div className="section-heading-wrap">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {glitchedTitle}
          </motion.h2>
          <motion.div
            className="cyan-underline"
            initial={{ width: 0 }}
            animate={inView ? { width: 56 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText
            text="Real results. Real businesses. Real growth."
            className="section-sub"
            delay={0.5}
          />
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="testi-layout">

          {/* LEFT — avatar stack */}
          <motion.div
            className="testi-avatars"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                className={`av-btn ${i === active ? "av-active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${t.name}`}
              >
                {/* progress ring on active */}
                {i === active && (
                  <svg className="av-ring-svg" viewBox="0 0 52 52">
                    <circle className="av-ring-bg" cx="26" cy="26" r="23" />
                    <motion.circle
                      className="av-ring-fill"
                      cx="26" cy="26" r="23"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  </svg>
                )}
                <div className="av-circle">{t.initials}</div>
                <div className="av-info">
                  <span className="av-name">{t.name}</span>
                  <span className="av-company">{t.company}</span>
                </div>
              </button>
            ))}
          </motion.div>

          {/* RIGHT — featured card */}
          <div className="testi-card-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="testi-card"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* decorative quote mark */}
                <div className="big-quote" aria-hidden="true">"</div>

                {/* top row */}
                <div className="tc-top">
                  <div className="tc-stars">
                    {[...Array(5)].map((_, si) => (
                      <svg key={si} width="15" height="15" viewBox="0 0 24 24" fill="#00e5ff">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <div className="tc-result-badge">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    {TESTIMONIALS[active].result}
                  </div>
                </div>

                {/* quote */}
                <p className="tc-quote">
                  {TESTIMONIALS[active].quote}
                </p>

                {/* divider */}
                <div className="tc-divider" />

                {/* author */}
                <div className="tc-author">
                  <div className="tc-avatar-wrap">
                    <div className="tc-avatar">{TESTIMONIALS[active].initials}</div>
                    <div className="tc-avatar-glow" />
                  </div>
                  <div>
                    <div className="tc-name">{TESTIMONIALS[active].name}</div>
                    <div className="tc-company">{TESTIMONIALS[active].company}</div>
                  </div>

                  {/* arrow controls */}
                  <div className="tc-arrows">
                    <button className="tc-arrow" onClick={prev} aria-label="Previous">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button className="tc-arrow" onClick={next} aria-label="Next">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                </div>

                {/* progress bar */}
                <div className="tc-progress-track">
                  <motion.div
                    className="tc-progress-fill"
                    key={active}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                </div>

                {/* corner brackets */}
                <span className="tc-br tl" /><span className="tc-br tr" />
                <span className="tc-br bl" /><span className="tc-br br" />
              </motion.div>
            </AnimatePresence>

            {/* dot indicators */}
            <div className="tc-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`tc-dot ${i === active ? "tc-dot-on" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── SECTION ── */
        .testi-section { background: #07090e; }

        /* ── TWO-COL LAYOUT ── */
        .testi-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ── AVATAR STACK (left) ── */
        .testi-avatars {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .av-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s;
          position: relative;
          text-align: left;
        }
        .av-btn:hover { background: rgba(0,229,255,0.04); border-color: rgba(0,229,255,0.15); }
        .av-active {
          background: rgba(0,229,255,0.06) !important;
          border-color: rgba(0,229,255,0.3) !important;
        }

        /* rotating progress ring */
        .av-ring-svg {
          position: absolute;
          top: 50%; left: 14px;
          transform: translateY(-50%) rotate(-90deg);
          width: 44px; height: 44px;
          pointer-events: none;
        }
        .av-ring-bg   { fill: none; stroke: rgba(0,229,255,0.12); stroke-width: 2.5; }
        .av-ring-fill { fill: none; stroke: #00e5ff; stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 145; }

        .av-circle {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          background: rgba(0,229,255,0.08);
          border: 1.5px solid rgba(0,229,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: #00e5ff;
          position: relative; z-index: 1;
        }
        .av-info { display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
        .av-name    { font-size: 12px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .av-company { font-size: 10.5px; color: rgba(255,255,255,0.35); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* ── FEATURED CARD (right) ── */
        .testi-card-wrap { display: flex; flex-direction: column; gap: 20px; }

        .testi-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,229,255,0.1);
          border-radius: 24px;
          padding: 40px 44px 32px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .testi-card:hover { border-color: rgba(0,229,255,0.22); }

        /* giant decorative quote */
        .big-quote {
          position: absolute;
          top: -10px; left: 28px;
          font-size: 160px; line-height: 1;
          color: rgba(0,229,255,0.06);
          font-family: Georgia, serif;
          pointer-events: none;
          user-select: none;
        }

        /* corner brackets */
        .tc-br {
          position: absolute;
          width: 14px; height: 14px;
          border-color: rgba(0,229,255,0.25);
          border-style: solid;
        }
        .tc-br.tl { top:12px; left:12px; border-width:1.5px 0 0 1.5px; }
        .tc-br.tr { top:12px; right:12px; border-width:1.5px 1.5px 0 0; }
        .tc-br.bl { bottom:12px; left:12px; border-width:0 0 1.5px 1.5px; }
        .tc-br.br { bottom:12px; right:12px; border-width:0 1.5px 1.5px 0; }

        /* top row */
        .tc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; position: relative; z-index: 1; }
        .tc-stars { display: flex; gap: 3px; }
        .tc-result-badge {
          display: flex; align-items: center; gap: 5px;
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em;
          color: #00e5ff;
          background: rgba(0,229,255,0.07);
          border: 1px solid rgba(0,229,255,0.18);
          padding: 5px 12px; border-radius: 50px;
        }

        /* quote text */
        .tc-quote {
          font-size: 16px;
          color: rgba(255,255,255,0.72);
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 28px;
          position: relative; z-index: 1;
          min-height: 96px;
        }

        .tc-divider { height: 1px; background: rgba(255,255,255,0.07); margin-bottom: 22px; }

        /* author row */
        .tc-author { display: flex; align-items: center; gap: 14px; position: relative; z-index: 1; }
        .tc-avatar-wrap { position: relative; flex-shrink: 0; }
        .tc-avatar {
          width: 46px; height: 46px; border-radius: 50%;
          background: rgba(0,229,255,0.1);
          border: 2px solid rgba(0,229,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: #00e5ff;
        }
        .tc-avatar-glow {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 1px solid rgba(0,229,255,0.2);
          animation: avatarPulse 2.5s ease-in-out infinite;
        }
        @keyframes avatarPulse { 0%,100%{transform:scale(1);opacity:.4;} 50%{transform:scale(1.15);opacity:.9;} }
        .tc-name    { font-size: 14px; font-weight: 700; color: #fff; }
        .tc-company { font-size: 11.5px; color: rgba(0,229,255,0.55); margin-top: 2px; }

        /* arrow buttons */
        .tc-arrows { display: flex; gap: 8px; margin-left: auto; }
        .tc-arrow {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(0,229,255,0.2);
          background: rgba(0,229,255,0.04);
          color: rgba(255,255,255,0.5);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .tc-arrow:hover { border-color: #00e5ff; color: #00e5ff; background: rgba(0,229,255,0.1); }

        /* progress bar */
        .tc-progress-track {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: rgba(255,255,255,0.05);
          border-radius: 0 0 24px 24px;
          overflow: hidden;
        }
        .tc-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(0,229,255,0.4), #00e5ff);
        }

        /* dot indicators */
        .tc-dots { display: flex; gap: 8px; justify-content: center; }
        .tc-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: none; cursor: pointer;
          transition: all 0.3s; padding: 0;
        }
        .tc-dot-on {
          background: #00e5ff;
          width: 26px; border-radius: 4px;
          box-shadow: 0 0 10px rgba(0,229,255,0.5);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .testi-layout { grid-template-columns: 1fr; gap: 24px; }
          .testi-avatars { flex-direction: row; flex-wrap: wrap; gap: 8px; }
          .av-btn { flex: 1 1 calc(50% - 4px); min-width: 140px; }
          .testi-card { padding: 28px 24px 24px; }
          .tc-quote { font-size: 14px; min-height: auto; }
          .big-quote { font-size: 100px; }
        }
        @media (max-width: 500px) {
          .av-btn { flex: 1 1 100%; }
          .testi-card { padding: 22px 18px 20px; }
          .tc-quote { font-size: 13.5px; }
          .tc-top { flex-direction: column; align-items: flex-start; gap: 10px; }
          .tc-arrows { margin-left: 0; }
          .tc-author { flex-wrap: wrap; }
        }
      `}</style>
    </section>
  );
}
/* ─────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────── */
function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const glitchedTitle = useGlitchText("Ready to Grow Your Brand?", inView);

  return (
    <section className="cta-section" ref={ref}>
      <MorphBlob className="blob-1" />
      <MorphBlob className="blob-2" />
      <div className="cta-inner">
        <h2 className="cta-heading">{glitchedTitle}</h2>
        <AnimatedText 
          text="Join 200+ businesses already scaling with BotMate's AI-powered strategies." 
          className="cta-sub"
          delay={0.2}
        />
        <div className="cta-btns">
          <motion.a 
            href="/get-started" 
            className="cta-btn-primary"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(0,229,255,0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
          <motion.a 
            href="/contact"     
            className="cta-btn-outline"
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Free Call
          </motion.a>
        </div>
      </div>
      <style jsx>{`
        .blob-1 { top: -100px; left: -100px; }
        .blob-2 { bottom: -100px; right: -100px; opacity: 0.1; }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Home",        href: "/" },
  { label: "About Us",    href: "/about" },
  { label: "Services",    href: "/services" },
  { label: "Packages",    href: "/packages" },
  { label: "Contact",     href: "/contact" },
  { label: "Get Started", href: "/get-started" },
];
const SERVICE_LINKS = ["SEO Optimization","Social Media Management","AI Chatbots","Paid Ads","Content Creation","Web Development"];
const SOCIALS = [
  { label: "IG", name: "Instagram" },
  { label: "Li", name: "LinkedIn"  },
  { label: "Tw", name: "Twitter"   },
  { label: "Yt", name: "YouTube"   },
];

function SiteFooter() {
  return <Footer />;
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function HomeClient() {
  return (
    <main className="home-main">
      <Hero />
      <TrustedBy />
      <ServicesSection />
      <StatsSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <CTABanner />
      <SiteFooter />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #060a0f;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
        }
        .home-main { background: #060a0f; }

        /* ══ SHARED ══ */
        .section        { padding: 100px 0; position: relative; }
        .section-inner  { max-width: 1280px; margin: 0 auto; padding: 0 48px; }

        .section-heading-wrap { text-align: center; margin-bottom: 64px; }
        .section-heading {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -1px;
          margin-bottom: 14px;
        }
        .section-sub {
          color: rgba(255,255,255,0.42);
          font-size: 15px;
          margin-top: 14px;
          line-height: 1.6;
        }
        .cyan-underline {
          width: 56px; height: 3px;
          background: #00e5ff;
          border-radius: 2px;
          margin: 0 auto;
          box-shadow: 0 0 14px rgba(0,229,255,0.5);
        }

        /* fade-up scroll trigger */
        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        /* ══ TRUSTED BY ══ */
        .trusted-section {
          padding: 28px 0 30px;
          border-top: 1px solid rgba(0,229,255,0.08);
          border-bottom: 1px solid rgba(0,229,255,0.08);
          background: rgba(0,229,255,0.018);
          overflow: hidden;
        }
        .trusted-label {
          text-align: center;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 18px;
        }
        .marquee-wrapper { overflow: hidden; position: relative; width: 100%; }
        .marquee-track {
          display: flex;
          gap: 72px;
          padding: 10px 0;
          width: max-content;
          animation: marqueeScroll 30s linear infinite;
        }
        .marquee-brand {
          font-size: 13px; font-weight: 700;
          color: rgba(255,255,255,0.2);
          letter-spacing: .1em;
          text-transform: uppercase;
          transition: color .3s;
          white-space: nowrap;
        }
        .marquee-brand:hover { color: rgba(0,229,255,0.55); }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ══ SERVICES ══ */
        .services-section { background: #060a0f; position: relative; overflow: hidden; }
        .services-section .blob-1 { top: -10%; right: -5%; }
        .services-section .blob-2 { bottom: -10%; left: -5%; width: 500px; height: 500px; }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .service-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,229,255,0.1);
          border-radius: 18px;
          padding: 36px 28px;
          transition: border-color .3s, transform .3s, box-shadow .3s, opacity .6s, transform .6s;
          cursor: default;
        }
        .service-card:hover {
          border-color: rgba(0,229,255,0.45);
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,229,255,0.09), 0 0 0 1px rgba(0,229,255,0.12);
        }
        .service-icon { width: 48px; height: 48px; margin-bottom: 20px; }
        .service-title { font-size: 16.5px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .service-desc  { font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.75; }

        /* ══ STATS ══ */
        .stats-section { background: #07090e; overflow: hidden; position: relative; }
        .stats-section .blob-3 { top: 20%; left: 50%; width: 600px; height: 600px; opacity: 0.5; }
        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,175,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,175,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 56px;
          position: relative; z-index: 1;
        }
        .stat-card {
          text-align: center;
          background: rgba(0,229,255,0.035);
          border: 1px solid rgba(0,229,255,0.12);
          border-radius: 18px;
          padding: 44px 20px;
          transition: border-color .3s, box-shadow .3s;
        }
        .stat-card:hover {
          border-color: rgba(0,229,255,0.3);
          box-shadow: 0 0 32px rgba(0,229,255,0.07);
        }
        .stat-number {
          font-size: clamp(38px, 4.5vw, 60px);
          font-weight: 900;
          color: #00e5ff;
          letter-spacing: -2px;
          text-shadow: 0 0 24px rgba(0,229,255,0.38);
          margin-bottom: 8px;
          min-height: 72px;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-label {
          font-size: 11.5px; font-weight: 700;
          color: rgba(255,255,255,0.38);
          text-transform: uppercase; letter-spacing: .18em;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          position: relative; z-index: 1;
        }
        .feature-item { display: flex; gap: 16px; align-items: flex-start; }
        .feature-check {
          flex-shrink: 0;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(0,229,255,0.1);
          display: flex; align-items: center; justify-content: center;
          margin-top: 2px;
        }
        .feature-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .feature-desc  { font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.7; }

        /* ══ PROCESS ══ */
        .process-section { background: #060a0f; }
        .process-track {
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .process-step {
          flex: 1;
          display: flex; flex-direction: column; align-items: center;
          text-align: center; padding: 0 20px;
          max-width: 260px;
        }
        .process-circle {
          width: 64px; height: 64px;
          border-radius: 50%;
          border: 2px solid #00e5ff;
          background: rgba(0,229,255,0.07);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; font-weight: 900; color: #00e5ff;
          margin-bottom: 20px;
          box-shadow: 0 0 22px rgba(0,229,255,0.22);
          position: relative; z-index: 2;
        }
        .process-line {
          flex: 0 0 auto;
          width: 72px;
          height: 2px;
          border-top: 2px dashed rgba(0,229,255,0.3);
          margin-top: 30px;
          flex-shrink: 0;
        }
        .process-title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .process-desc  { font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.7; max-width: 210px; }

        /* ══ PRICING ══ */
        .pricing-section { background: #07090e; }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: center;
        }
        .pricing-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,229,255,0.1);
          border-radius: 22px;
          padding: 40px 32px;
          position: relative;
          overflow: visible;
          transition: border-color .3s, box-shadow .3s, transform .3s;
        }
        .pricing-card:hover { transform: translateY(-4px); }
        .pricing-popular {
          border-color: rgba(0,229,255,0.5) !important;
          box-shadow: 0 0 48px rgba(0,229,255,0.1), 0 0 0 1px rgba(0,229,255,0.18);
          background: rgba(0,229,255,0.04);
          transform: scale(1.04);
        }
        .pricing-popular:hover { transform: scale(1.04) translateY(-4px); }
        .popular-badge {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: #00e5ff; color: #060a0f;
          font-size: 10px; font-weight: 800; letter-spacing: .1em;
          padding: 5px 16px; border-radius: 50px;
          white-space: nowrap;
        }
        .pulse-ring {
          position: absolute; inset: -3px;
          border-radius: 24px;
          border: 1px solid rgba(0,229,255,0.35);
          animation: pricePulse 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes pricePulse {
          0%,100% { opacity:.5; transform:scale(1); }
          50%      { opacity:1;  transform:scale(1.01); }
        }
        .plan-name  { font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,0.38); margin-bottom: 14px; }
        .plan-price { font-size: clamp(28px,3vw,44px); font-weight: 900; color: #fff; margin-bottom: 28px; letter-spacing: -1px; }
        .plan-period { font-size: 15px; font-weight: 500; color: rgba(255,255,255,0.38); letter-spacing: 0; }
        .plan-features { list-style: none; margin-bottom: 32px; display: flex; flex-direction: column; gap: 12px; }
        .plan-feature  { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: rgba(255,255,255,0.62); }
        .plan-cta {
          display: block; text-align: center; text-decoration: none;
          padding: 14px 24px; border-radius: 50px;
          font-size: 14px; font-weight: 700; transition: all .25s;
        }
        .plan-cta-primary {
          background: #00e5ff; color: #060a0f;
          box-shadow: 0 4px 22px rgba(0,229,255,0.38);
        }
        .plan-cta-primary:hover {
          background: #00f7ff;
          box-shadow: 0 8px 34px rgba(0,229,255,0.52);
          transform: translateY(-2px);
        }
        .plan-cta-outline { border: 2px solid rgba(0,229,255,0.32); color: #fff; }
        .plan-cta-outline:hover {
          border-color: #00e5ff; color: #00e5ff;
          box-shadow: 0 0 22px rgba(0,229,255,0.14);
          transform: translateY(-2px);
        }

        /* ══ TESTIMONIALS ══ */
        .testimonials-section { background: #060a0f; }

        /* sliding-window carousel */
        .t-carousel-outer {
          overflow: hidden;
          border-radius: 20px;
          position: relative;
        }
        .t-carousel-track {
          display: flex;
          transition: transform .5s cubic-bezier(.4,0,.2,1);
          will-change: transform;
        }
        .testimonial-card {
          flex: 0 0 100%;
          background: rgba(255,255,255,0.038);
          border: 1px solid rgba(0,229,255,0.12);
          border-radius: 20px;
          padding: 44px 48px;
          background: rgba(4, 8, 15, 0.92);
        }
        .t-stars { display: flex; gap: 4px; margin-bottom: 18px; }
        .t-quote {
          font-size: 15.5px; color: rgba(255,255,255,0.72);
          line-height: 1.8; margin-bottom: 28px; font-style: italic;
        }
        .t-author { display: flex; align-items: center; gap: 14px; }
        .t-avatar {
          width: 46px; height: 46px; border-radius: 50%;
          background: rgba(0,229,255,0.12);
          border: 2px solid rgba(0,229,255,0.28);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #00e5ff;
          flex-shrink: 0;
        }
        .t-name    { font-size: 14px; font-weight: 700; color: #fff; }
        .t-company { font-size: 12px; color: rgba(0,229,255,0.6); margin-top: 2px; }

        .t-dots {
          display: flex; justify-content: center; gap: 8px; margin-top: 28px;
        }
        .t-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: none; cursor: pointer;
          transition: all .3s; padding: 0;
        }
        .t-dot-active {
          background: #00e5ff; width: 26px; border-radius: 4px;
          box-shadow: 0 0 10px rgba(0,229,255,0.5);
        }
        .t-arrows {
          display: flex; gap: 12px; justify-content: center; margin-top: 20px;
        }
        .t-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid rgba(0,229,255,0.25);
          background: rgba(0,229,255,0.05);
          color: rgba(255,255,255,0.6);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .25s;
        }
        .t-arrow:hover {
          border-color: #00e5ff; color: #00e5ff;
          background: rgba(0,229,255,0.1);
        }

        /* ══ CTA ══ */
        .cta-section {
          position: relative; padding: 130px 48px;
          text-align: center; overflow: hidden;
          background: linear-gradient(135deg, rgba(0,25,55,.92) 0%, rgba(4,8,15,.96) 50%, rgba(0,45,75,.88) 100%);
        }
        .cta-glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 350px;
          background: radial-gradient(ellipse, rgba(0,229,255,0.16) 0%, transparent 70%);
          animation: ctaGlow 4s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes ctaGlow {
          from { opacity:.6; transform:translate(-50%,-50%) scale(1); }
          to   { opacity:1;  transform:translate(-50%,-50%) scale(1.18); }
        }
        .cta-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .cta-particle {
          position: absolute; width: 3px; height: 3px; border-radius: 50%;
          background: rgba(0,229,255,0.4);
          top:  calc(4% + var(--pi) * 4%);
          left: calc(2% + var(--pi) * 4.1%);
          animation: ctaFloat calc(5s + var(--pi) * 0.3s) ease-in-out infinite alternate;
          animation-delay: calc(var(--pi) * 0.2s);
        }
        @keyframes ctaFloat {
          from { transform:translateY(0) scale(1); opacity:.25; }
          to   { transform:translateY(-30px) scale(1.6); opacity:.75; }
        }
        .cta-inner { position: relative; z-index: 2; max-width: 680px; margin: 0 auto; }
        .cta-heading {
          font-size: clamp(30px, 5vw, 58px);
          font-weight: 900; color: #fff;
          letter-spacing: -1.5px; margin-bottom: 18px; line-height: 1.08;
        }
        .cta-sub {
          font-size: 16px; color: rgba(255,255,255,0.5);
          line-height: 1.7; margin-bottom: 48px;
        }
        .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .cta-btn-primary {
          background: #00e5ff; color: #060a0f;
          font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 700;
          padding: 16px 44px; border-radius: 50px; text-decoration: none;
          box-shadow: 0 4px 26px rgba(0,229,255,0.44);
          transition: all .25s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cta-btn-primary:hover {
          background: #00f7ff;
          box-shadow: 0 8px 38px rgba(0,229,255,0.62);
          transform: translateY(-2px);
        }
        .cta-btn-outline {
          background: transparent; color: #fff;
          font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 600;
          padding: 15px 44px; border-radius: 50px;
          border: 2px solid rgba(255,255,255,0.32);
          text-decoration: none; transition: all .25s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cta-btn-outline:hover {
          border-color: rgba(255,255,255,.65);
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }

        /* ══ FOOTER ══ */
        .site-footer {
          background: #030609;
          border-top: 1px solid rgba(0,229,255,0.08);
          padding: 80px 48px 0;
        }
        .footer-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px; padding-bottom: 64px;
        }
        .footer-logo { font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -.5px; margin-bottom: 14px; }
        .footer-logo span { color: #00e5ff; }
        .footer-tagline { font-size: 13px; color: rgba(255,255,255,0.36); line-height: 1.75; margin-bottom: 24px; max-width: 240px; }
        .footer-socials { display: flex; gap: 10px; }
        .footer-social {
          width: 38px; height: 38px; border-radius: 10px;
          border: 1px solid rgba(0,229,255,0.18);
          background: rgba(0,229,255,0.05);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.45);
          text-decoration: none; transition: all .2s; letter-spacing: 0;
        }
        .footer-social:hover { border-color: #00e5ff; color: #00e5ff; background: rgba(0,229,255,0.1); }
        .footer-col-heading {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .22em; color: rgba(255,255,255,0.32); margin-bottom: 18px;
        }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-link { font-size: 13.5px; color: rgba(255,255,255,0.48); text-decoration: none; transition: color .2s; }
        .footer-link:hover { color: #00e5ff; }
        .footer-contact-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .footer-contact-list li { display: flex; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.42); line-height: 1.5; }
        .footer-bottom {
          max-width: 1280px; margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 24px 0;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px; color: rgba(255,255,255,0.28);
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 960px) {
          .section { padding: 64px 0; overflow-x: hidden; }
          .section-inner { padding: 0 20px; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-grid    { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; }
          .pricing-grid  { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
          .pricing-popular { transform: scale(1); }
          .pricing-popular:hover { transform: translateY(-4px); }
          .process-track {
            flex-direction: column; align-items: center; gap: 0; padding: 0;
          }
          .process-step  { flex-direction: column; align-items: center; max-width: 320px; padding: 0 16px 0; }
          .process-line  { width: 2px; height: 36px; border-top: none; border-left: 2px dashed rgba(0,229,255,0.3); margin-top: 0; }
          .footer-inner  { grid-template-columns: 1fr 1fr; gap: 36px; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
          .cta-section   { padding: 80px 28px; }
          .site-footer   { padding: 60px 28px 0; }
          .testimonial-card { padding: 32px 28px; }
        }

        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
          .stats-grid    { grid-template-columns: repeat(2, 1fr); }
          .footer-inner  { grid-template-columns: 1fr; }
          .cta-heading   { font-size: 30px; }
          .t-quote       { font-size: 14px; }
          .testimonial-card { padding: 28px 22px; }
        }
      `}</style>
    </main>
  );
}
