"use client";

import React, { useRef, useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { motion, useInView, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { AnimatedText, StaggerReveal, RevealItem } from "@/components/AnimationSystem";
import dynamic from "next/dynamic";

const MorphBlob = dynamic(() => import("@/components/MorphBlob"), { ssr: false, loading: () => null });

/* ─────────────────────────────────────────────
   AR CORNER BRACKETS
───────────────────────────────────────────── */
function ARBrackets({
  size = 20,
  color = "#00e5ff",
  thickness = 2,
}: {
  size?: number;
  color?: string;
  thickness?: number;
}) {
  const s = `${size}px`;
  const b = `${thickness}px solid ${color}`;
  return (
    <>
      <span style={{ position: "absolute", top: 0, left: 0, width: s, height: s, borderTop: b, borderLeft: b, pointerEvents: "none" }} />
      <span style={{ position: "absolute", top: 0, right: 0, width: s, height: s, borderTop: b, borderRight: b, pointerEvents: "none" }} />
      <span style={{ position: "absolute", bottom: 0, left: 0, width: s, height: s, borderBottom: b, borderLeft: b, pointerEvents: "none" }} />
      <span style={{ position: "absolute", bottom: 0, right: 0, width: s, height: s, borderBottom: b, borderRight: b, pointerEvents: "none" }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   LIQUID DIVIDER
───────────────────────────────────────────── */
function LiquidDivider() {
  return (
    <div aria-hidden="true" style={{ width: "100%", height: 60 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
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
    </div>
  );
}

/* ─────────────────────────────────────────────
   PLANS DATA
───────────────────────────────────────────── */
const PLANS = [
  {
    name: "Starter Plan",
    price: "₹9,999",
    period: "/mo",
    popular: false,
    tag: "GREAT START",
    color: "rgba(0,229,255,0.1)",
    features: [
      "~ 10-20K Reach",
      "10 Creative Posts",
      "1 Shoot & Video",
      "Images & Video Content (User Provided)",
      "Profile Management",
      "Competitor Research",
      "ORM",
      "Performance Reports",
    ],
    cta: "Get Started",
    href: "/get-started",
  },
  {
    name: "Business Plan",
    price: "₹14,999",
    period: "/mo",
    popular: true,
    tag: "MOST POPULAR",
    color: "#00e5ff",
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
      "Performance Reports",
    ],
    cta: "Start Scaling",
    href: "/get-started",
  },
  {
    name: "Enterprise Plan",
    price: "₹19,999",
    period: "/mo",
    popular: false,
    tag: "MAX GROWTH",
    color: "rgba(0,229,255,0.1)",
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
      "Performance Reports",
    ],
    cta: "Maximize Growth",
    href: "/get-started",
  },
];

/* ─────────────────────────────────────────────
   PACKAGES HERO
───────────────────────────────────────────── */
function PackagesHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="pkg-hero" ref={ref}>
      <MorphBlob className="hero-blob" />
      <div className="hero-grid" aria-hidden="true" />

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
        <motion.p
          className="pre-tag"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <span className="tag-bracket">[</span> PRICING &amp; PACKAGES <span className="tag-bracket">]</span>
        </motion.p>

        <h1 className="hero-title">
          <AnimatedText text="Choose Your Plan" />
        </h1>

        <motion.div
          className="title-line"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Quick stats row - displayed as horizontal boxes */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[
            { val: "200+", label: "Active Clients" },
            { val: "5×",   label: "Avg ROI" },
            { val: "24/7", label: "Support" },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="hero-stat"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ARBrackets size={8} color="rgba(0, 229, 255, 0.25)" thickness={1} />
              <span className="hs-val">{s.val}</span>
              <span className="hs-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .pkg-hero {
          min-height: 52vh; background: #060a0f;
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid rgba(0,229,255,0.06);
        }
        :global(.hero-blob) { position: absolute; width: 700px; height: 700px; top: 50%; left: 50%; transform: translate(-50%,-50%); }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-wave { position: absolute; bottom: 0; left: 0; right: 0; height: 80px; }
        .hero-wave svg { width: 100%; height: 100%; display: block; }

        .hero-content {
          position: relative; z-index: 2;
          text-align: center; padding: 80px 48px;
          max-width: 860px;
        }
        .pre-tag { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.5); display: block; margin-bottom: 24px; }
        .tag-bracket { color: #00e5ff; }
        .hero-title {
          font-size: clamp(44px, 7vw, 88px); font-weight: 900;
          color: #fff; line-height: 1; margin-bottom: 16px; letter-spacing: -0.02em;
        }
        .title-line {
          height: 3px; width: 180px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
          margin: 0 auto 22px; transform-origin: center;
          box-shadow: 0 0 20px rgba(0,229,255,0.4);
        }

        :global(.hero-stats) {
          display: flex !important; align-items: center; justify-content: center;
          gap: 16px; margin-top: 40px; flex-wrap: wrap;
        }
        :global(.hero-stat) {
          position: relative;
          background: rgba(0, 229, 255, 0.02);
          border: 1px solid rgba(0, 229, 255, 0.12);
          border-radius: 12px;
          padding: 18px 28px;
          display: flex !important; flex-direction: column; align-items: center; gap: 4px;
          min-width: 150px;
          transition: all 0.3s ease;
        }
        :global(.hero-stat:hover) {
          background: rgba(0, 229, 255, 0.05);
          border-color: rgba(0, 229, 255, 0.35);
          box-shadow: 0 10px 25px rgba(0, 229, 255, 0.08);
        }
        :global(.hs-val) { font-size: 28px; font-weight: 900; color: #00e5ff; letter-spacing: -1px; }
        :global(.hs-label) { font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.18em; font-family: monospace; }

        @media (max-width: 768px) {
          .hero-content { padding: 80px 24px; }
          :global(.hero-stats) { gap: 12px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRICING SECTION  (identical card UI to home)
───────────────────────────────────────────── */
function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="pricing-section" ref={ref}>
      <MorphBlob className="blob-a" />
      <MorphBlob className="blob-b" />

      <div className="section-inner">
        <div className="section-heading-wrap">
          <motion.p
            className="pre-label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            [ SELECT YOUR PACKAGE ]
          </motion.p>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transparent Pricing
          </motion.h2>
          <motion.div
            className="cyan-underline"
            initial={{ width: 0 }}
            animate={inView ? { width: 56 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <AnimatedText
            text="Pick the plan that fits your brand. Scale anytime."
            className="section-sub"
            delay={0.5}
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
                    rotateX: 2,
                    rotateY: 2,
                    boxShadow: "0 25px 50px rgba(0,229,255,0.12)",
                  }}
                >
                  <ARBrackets size={16} color="rgba(0,229,255,0.2)" />
                  {p.popular && <div className="popular-badge">MOST POPULAR</div>}
                  {p.popular && <div className="pulse-ring" />}

                  <p className="plan-name">{p.name}</p>
                  <div className="plan-price">
                    {p.price}
                    <span className="plan-period">{p.period}</span>
                  </div>

                  <ul className="plan-features">
                    {p.features.map((f, j) => (
                      <li key={j} className="plan-feature">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={p.href}
                    className={`plan-cta${p.popular ? " plan-cta-primary" : " plan-cta-outline"}`}
                    aria-label={`${p.cta} with ${p.name}`}
                  >
                    {p.cta}
                  </a>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </StaggerReveal>
      </div>

      <style jsx>{`
        .pricing-section {
          padding: 80px 0 100px; background: #07090e;
          position: relative; overflow: hidden;
        }
        :global(.blob-a) { top: -10%; left: -5%; }
        :global(.blob-b) { bottom: -10%; right: -5%; opacity: 0.3; }

        .section-inner { max-width: 1280px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 2; }

        .section-heading-wrap { text-align: center; margin-bottom: 64px; }
        .pre-label { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.4); margin-bottom: 14px; }
        .section-heading {
          font-size: clamp(28px, 4vw, 48px); font-weight: 800;
          color: #fff; letter-spacing: -1px; margin-bottom: 14px;
        }
        .cyan-underline {
          height: 3px; background: #00e5ff; border-radius: 2px;
          margin: 0 auto 16px;
          box-shadow: 0 0 14px rgba(0,229,255,0.5);
        }
        .section-sub { color: rgba(255,255,255,0.42); font-size: 15px; margin-top: 14px; }

        /* ── GRID ── */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: center;
        }

        /* ── CARD BASE ── */
        .pricing-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,229,255,0.1);
          border-radius: 22px;
          padding: 40px 32px;
          position: relative;
          overflow: visible;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .pricing-card:hover { transform: translateY(-4px); }

        /* ── POPULAR CARD ── */
        .pricing-popular {
          border-color: rgba(0,229,255,0.5) !important;
          box-shadow: 0 0 48px rgba(0,229,255,0.1), 0 0 0 1px rgba(0,229,255,0.18);
          background: rgba(0,229,255,0.04);
          transform: scale(1.04);
        }
        .pricing-popular:hover { transform: scale(1.04) translateY(-4px); }

        /* ── POPULAR BADGE ── */
        .popular-badge {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: #00e5ff; color: #060a0f;
          font-size: 10px; font-weight: 800; letter-spacing: 0.1em;
          padding: 5px 16px; border-radius: 50px;
          white-space: nowrap;
        }

        /* ── PULSE RING ── */
        .pulse-ring {
          position: absolute; inset: -3px;
          border-radius: 24px;
          border: 1px solid rgba(0,229,255,0.35);
          animation: pricePulse 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes pricePulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.01); }
        }

        /* ── TYPOGRAPHY ── */
        .plan-name {
          font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.38); margin-bottom: 14px;
        }
        .plan-price {
          font-size: clamp(28px, 3vw, 44px); font-weight: 900;
          color: #fff; margin-bottom: 28px; letter-spacing: -1px;
        }
        .plan-period { font-size: 15px; font-weight: 500; color: rgba(255,255,255,0.38); letter-spacing: 0; }

        /* ── FEATURES ── */
        .plan-features {
          list-style: none; margin-bottom: 32px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .plan-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 13.5px; color: rgba(255,255,255,0.62);
        }

        /* ── CTA BUTTONS ── */
        .plan-cta {
          display: block; text-align: center; text-decoration: none;
          padding: 14px 24px; border-radius: 50px;
          font-size: 14px; font-weight: 700; transition: all 0.25s;
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

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; }
          .pricing-popular { transform: scale(1); }
          .pricing-popular:hover { transform: translateY(-4px); }
          .section-inner { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COMPARISON TABLE
───────────────────────────────────────────── */
const COMPARE_ROWS = [
  { feature: "Monthly Reach",          starter: "10-20K",   business: "30-40K",  enterprise: "50-100K" },
  { feature: "Creative Posts",         starter: "10",        business: "15",       enterprise: "20" },
  { feature: "Shoots & Videos",        starter: "1",         business: "2",        enterprise: "3" },
  { feature: "Profile Management",     starter: true,        business: true,       enterprise: true },
  { feature: "Competitor Research",    starter: true,        business: true,       enterprise: true },
  { feature: "ORM",                    starter: true,        business: true,       enterprise: true },
  { feature: "Target Audience",        starter: false,       business: true,       enterprise: true },
  { feature: "Google My Business",     starter: false,       business: true,       enterprise: true },
  { feature: "Performance Reports",    starter: true,        business: true,       enterprise: true },
];

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const Cross = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function renderCell(val: boolean | string) {
  if (val === true)  return <Check />;
  if (val === false) return <Cross />;
  return <span style={{ fontSize: 13, color: "#fff", fontWeight: 700 }}>{val}</span>;
}

function CompareSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="compare-section" ref={ref}>
      <LiquidDivider />
      <div className="section-inner">
        <motion.div
          className="heading-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="pre-label">[ COMPARE PLANS ]</p>
          <h2 className="section-heading">Side-by-Side Breakdown</h2>
          <div className="cyan-underline" style={{ width: 56 }} />
        </motion.div>

        <motion.div
          className="table-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <table className="compare-table">
            <thead>
              <tr>
                <th className="col-feature">Feature</th>
                <th className="col-plan">Starter<br /><span className="th-price">₹9,999/mo</span></th>
                <th className="col-plan col-popular">Business<br /><span className="th-price">₹14,999/mo</span><div className="th-badge">POPULAR</div></th>
                <th className="col-plan">Enterprise<br /><span className="th-price">₹19,999/mo</span></th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "row-alt" : ""}>
                  <td className="td-feature">{row.feature}</td>
                  <td className="td-val">{renderCell(row.starter)}</td>
                  <td className="td-val td-popular">{renderCell(row.business)}</td>
                  <td className="td-val">{renderCell(row.enterprise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      <style jsx>{`
        .compare-section { padding: 20px 0 100px; background: #060a0f; position: relative; }
        .section-inner { max-width: 1100px; margin: 0 auto; padding: 0 48px; }
        .heading-wrap { text-align: center; margin-bottom: 48px; }
        .pre-label { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.4); margin-bottom: 14px; }
        .section-heading { font-size: clamp(24px, 3.5vw, 40px); font-weight: 800; color: #fff; margin-bottom: 16px; }
        .cyan-underline { height: 3px; background: #00e5ff; border-radius: 2px; margin: 0 auto; box-shadow: 0 0 14px rgba(0,229,255,0.5); }

        .table-wrap {
          overflow-x: auto; border-radius: 20px;
          border: 1px solid rgba(0,229,255,0.1);
          box-shadow: 0 0 40px rgba(0,229,255,0.04);
        }
        .compare-table { width: 100%; border-collapse: collapse; }
        thead { background: rgba(0,229,255,0.04); }
        th {
          padding: 20px 24px; font-size: 13px; font-weight: 700;
          color: rgba(255,255,255,0.5); text-align: center;
          border-bottom: 1px solid rgba(0,229,255,0.1);
        }
        .col-feature { text-align: left; color: rgba(255,255,255,0.3); font-size: 11px; letter-spacing: 0.15em; }
        .col-popular {
          background: rgba(0,229,255,0.06);
          color: #00e5ff; position: relative;
          border-left: 1px solid rgba(0,229,255,0.15);
          border-right: 1px solid rgba(0,229,255,0.15);
        }
        .th-price { font-size: 11px; color: rgba(0,229,255,0.5); font-weight: 500; display: block; margin-top: 4px; }
        .th-badge {
          position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
          background: #00e5ff; color: #060a0f;
          font-size: 9px; font-weight: 800; letter-spacing: 0.12em;
          padding: 3px 12px; border-radius: 0 0 8px 8px;
        }

        tr { border-bottom: 1px solid rgba(255,255,255,0.04); }
        tr:last-child { border-bottom: none; }
        .row-alt { background: rgba(255,255,255,0.015); }
        td { padding: 16px 24px; text-align: center; }
        .td-feature { text-align: left; font-size: 13.5px; color: rgba(255,255,255,0.55); }
        .td-val { vertical-align: middle; }
        .td-popular {
          background: rgba(0,229,255,0.04);
          border-left: 1px solid rgba(0,229,255,0.1);
          border-right: 1px solid rgba(0,229,255,0.1);
        }

        @media (max-width: 768px) {
          .section-inner { padding: 0 16px; }
          td, th { padding: 14px 14px; }
          .td-feature { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const FAQS = [
  { q: "Can I upgrade or downgrade my plan anytime?", a: "Yes. You can switch between plans at the start of your next billing cycle with no penalties. Our team will handle the transition seamlessly." },
  { q: "What does 'User Provided' mean for content?", a: "It means you supply the raw images or video footage, and our creative team edits, designs, and formats it into scroll-stopping content for your platforms." },
  { q: "Is there a setup fee or onboarding charge?", a: "No setup fees whatsoever. Once you choose your plan, we begin the onboarding process immediately at no additional cost." },
  { q: "How soon will I see results?", a: "Most clients see measurable growth in reach and engagement within the first 30 days. For ROI on paid campaigns, we typically hit positive returns within 60 days." },
  { q: "Do you manage both Instagram and Facebook?", a: "Yes. All plans include multi-platform management. We cover Instagram, Facebook, and Google My Business (Business & Enterprise plans)." },
  { q: "What is ORM?", a: "ORM stands for Online Reputation Management — monitoring and responding to reviews, mentions, and feedback across platforms to protect and build your brand image." },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={`faq-item ${open ? "faq-open" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <button className="faq-q" onClick={() => setOpen(p => !p)} aria-expanded={open}>
        <span>{q}</span>
        <motion.div
          className="faq-icon"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .faq-item {
          border: 1px solid rgba(0,229,255,0.08);
          border-radius: 14px; overflow: hidden;
          transition: border-color 0.3s, background 0.3s;
          background: rgba(4,8,15,0.7);
        }
        .faq-item.faq-open {
          border-color: rgba(0,229,255,0.25);
          background: rgba(0,229,255,0.02);
        }
        .faq-q {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 22px 24px;
          background: transparent; border: none; cursor: pointer;
          font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.8);
          font-family: inherit; text-align: left;
          transition: color 0.25s;
        }
        .faq-open .faq-q { color: #fff; }
        .faq-icon { color: rgba(0,229,255,0.5); flex-shrink: 0; }
        .faq-open .faq-icon { color: #00e5ff; }
        .faq-a { overflow: hidden; }
        .faq-a p {
          padding: 0 24px 22px;
          font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.75;
        }
      `}</style>
    </motion.div>
  );
}

function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section className="faq-section" ref={ref}>
      <LiquidDivider />
      <div className="section-inner">
        <motion.div
          className="heading-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="pre-label">[ FAQ ]</p>
          <h2 className="section-heading">Common Questions</h2>
          <div className="cyan-underline" style={{ width: 56 }} />
        </motion.div>
        <div className="faq-grid">
          {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
        </div>
      </div>
      <style jsx>{`
        .faq-section { padding: 20px 0 100px; background: #07090e; position: relative; }
        .section-inner { max-width: 860px; margin: 0 auto; padding: 0 48px; }
        .heading-wrap { text-align: center; margin-bottom: 48px; }
        .pre-label { font-family: monospace; font-size: 11px; letter-spacing: 0.3em; color: rgba(0,229,255,0.4); margin-bottom: 14px; }
        .section-heading { font-size: clamp(24px, 3.5vw, 40px); font-weight: 800; color: #fff; margin-bottom: 16px; }
        .cyan-underline { height: 3px; background: #00e5ff; border-radius: 2px; margin: 0 auto; box-shadow: 0 0 14px rgba(0,229,255,0.5); }
        .faq-grid { display: flex; flex-direction: column; gap: 12px; }
        @media (max-width: 768px) { .section-inner { padding: 0 20px; } }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────── */
function CTABanner({ onBookCall }: { onBookCall: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section className="cta-section" ref={ref}>
      <MorphBlob className="cta-blob-1" />
      <MorphBlob className="cta-blob-2" />
      <div className="section-inner">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <ARBrackets size={24} color="#00e5ff" thickness={2.5} />
          
          <div className="cta-badge">
            <span className="badge-dot" />
            <span>GROWTH PROTOCOL</span>
          </div>

          <h2 className="cta-heading">
            Ready to Grow Your Brand?
          </h2>

          <p className="cta-sub">
            Join 200+ businesses already scaling with BotMate&apos;s AI-powered strategies.
          </p>

          <div className="cta-btns">
            <motion.a
              href="/get-started"
              className="cta-btn-primary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started →
            </motion.a>
            <motion.button
              type="button"
              className="cta-btn-outline"
              onClick={onBookCall}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Free Call
            </motion.button>
          </div>
        </motion.div>
      </div>
      <style jsx>{`
        .cta-section {
          position: relative; padding: 120px 0;
          overflow: hidden;
          background: #060a0f;
        }
        .section-inner {
          max-width: 1080px; margin: 0 auto; padding: 0 48px;
        }
        :global(.cta-blob-1) { top: -200px; left: -100px; opacity: 0.15; }
        :global(.cta-blob-2) { bottom: -200px; right: -100px; opacity: 0.15; }
        
        .cta-card {
          position: relative;
          background: rgba(0, 229, 255, 0.02);
          border: 1px solid rgba(0, 229, 255, 0.12);
          border-radius: 32px;
          padding: 80px 48px;
          text-align: center;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }
        .cta-card::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(circle at top, rgba(0, 229, 255, 0.08) 0%, transparent 60%);
        }
        .cta-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: monospace; font-size: 10px; letter-spacing: 0.25em;
          color: #00e5ff; background: rgba(0, 229, 255, 0.06);
          border: 1px solid rgba(0, 229, 255, 0.15);
          padding: 6px 14px; border-radius: 50px;
          margin-bottom: 24px;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #00e5ff;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .cta-heading {
          font-size: clamp(28px, 4.5vw, 48px); font-weight: 900; color: #fff;
          letter-spacing: -1.5px; margin-bottom: 16px; line-height: 1.1;
        }
        .cta-sub {
          font-size: 16px; color: rgba(255, 255, 255, 0.45);
          line-height: 1.7; margin-bottom: 40px; max-width: 580px; margin-left: auto; margin-right: auto;
        }
        .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .cta-btn-primary {
          background: #00e5ff; color: #060a0f;
          font-size: 15px; font-weight: 700;
          padding: 16px 36px; border-radius: 50px; text-decoration: none;
          box-shadow: 0 4px 26px rgba(0, 229, 255, 0.44); transition: all 0.25s;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .cta-btn-primary:hover { background: #00f7ff; box-shadow: 0 6px 32px rgba(0, 229, 255, 0.6); }
        
        /* Outline button turned to motion.button styles */
        :global(.cta-btn-outline) {
          background: transparent; color: #fff;
          font-size: 15px; font-weight: 600;
          padding: 15px 36px; border-radius: 50px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          text-decoration: none; transition: all 0.25s;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; font-family: inherit;
        }
        :global(.cta-btn-outline:hover) { border-color: #00e5ff; color: #00e5ff; background: rgba(0,229,255,0.02); }
        @media (max-width: 768px) {
          .cta-card { padding: 60px 24px; border-radius: 24px; }
          .section-inner { padding: 0 20px; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BOOK A FREE CALL MODAL
───────────────────────────────────────────── */
function BookCallModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("done");
    }, 1800);
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="modal-card"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        <ARBrackets size={18} color="#00e5ff" thickness={2} />

        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {status !== "done" ? (
          <>
            <div className="modal-header">
              <span className="modal-badge">[ CALENDAR PROTOCOL ]</span>
              <h3 className="modal-title">Book Strategy Session</h3>
              <p className="modal-sub">
                Select your preferred date &amp; time, and our specialist will connect with you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="modal-name">Full Name</label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="modal-email">Email Address</label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-phone">Phone Number</label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="modal-date">Preferred Date</label>
                  <input
                    id="modal-date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-time">Preferred Time</label>
                  <input
                    id="modal-time"
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={status === "sending"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "sending" ? "Transmitting Protocol..." : "Confirm Booking →"}
              </motion.button>
            </form>
          </>
        ) : (
          <motion.div
            className="success-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="success-hex">
              <svg width="60" height="60" viewBox="0 0 64 64">
                <polygon points="32,4 60,18 60,46 32,60 4,46 4,18"
                  stroke="#00e5ff" strokeWidth="2" fill="rgba(0,229,255,0.08)"
                  style={{ animation: "hexSpin 8s linear infinite", transformOrigin: "center" }}
                />
                <text x="32" y="38" textAnchor="middle" fill="#00e5ff" fontSize="22" fontWeight="900">✓</text>
              </svg>
            </div>
            <h3 className="success-title">Strategy Call Confirmed!</h3>
            <p className="success-msg">
              Thank you, <strong>{name}</strong>. Your session is successfully scheduled for <strong>{date}</strong> at <strong>{time}</strong>.
            </p>
            <p className="success-subtext">
              We&apos;ve sent a calendar invitation and confirmation link to <strong>{email}</strong>. Prepare your business goals!
            </p>
            <button className="confirm-close-btn" onClick={onClose}>
              Dismiss
            </button>
          </motion.div>
        )}
      </motion.div>

      <style jsx>{`
        .modal-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(4, 8, 15, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        :global(.modal-card) {
          position: relative;
          background: rgba(8, 14, 25, 0.95);
          border: 1px solid rgba(0, 229, 255, 0.16);
          border-radius: 24px;
          width: 100%; max-width: 600px;
          padding: 48px;
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.8), 0 0 80px rgba(0, 229, 255, 0.05);
          overflow: hidden;
        }
        .modal-card::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(circle at top right, rgba(0, 229, 255, 0.08) 0%, transparent 60%);
        }
        .close-btn {
          position: absolute; top: 24px; right: 24px;
          background: transparent; border: none;
          color: rgba(255, 255, 255, 0.4); font-size: 18px;
          cursor: pointer; transition: color 0.2s;
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
        }
        .close-btn:hover { color: #00e5ff; }

        .modal-header { text-align: center; margin-bottom: 32px; }
        .modal-badge {
          font-family: monospace; font-size: 10px; color: #00e5ff;
          letter-spacing: 0.2em; display: block; margin-bottom: 12px;
        }
        .modal-title { font-size: 28px; font-weight: 900; color: #fff; letter-spacing: -0.5px; margin-bottom: 10px; }
        .modal-sub { font-size: 13.5px; color: rgba(255, 255, 255, 0.45); line-height: 1.6; }

        .modal-form { display: flex; flex-direction: column; gap: 20px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label {
          font-family: monospace; font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.15em; color: rgba(255, 255, 255, 0.4);
        }
        .form-group input {
          background: rgba(4, 8, 15, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 14px 18px; font-size: 14px; color: #fff;
          outline: none; transition: border-color 0.25s, background 0.25s;
          font-family: inherit;
        }
        .form-group input:focus {
          border-color: rgba(0, 229, 255, 0.4);
          background: rgba(0, 229, 255, 0.02);
        }
        
        .form-group input[type="date"]::-webkit-calendar-picker-indicator,
        .form-group input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(1) saturate(5) hue-rotate(150deg);
          cursor: pointer;
        }

        .submit-btn {
          background: #00e5ff; color: #060a0f;
          font-size: 14px; font-weight: 700;
          padding: 16px; border: none; border-radius: 50px;
          cursor: pointer; transition: all 0.25s;
          box-shadow: 0 4px 26px rgba(0, 229, 255, 0.38);
          margin-top: 12px;
          font-family: inherit;
        }
        .submit-btn:hover { background: #00f7ff; box-shadow: 0 6px 32px rgba(0, 229, 255, 0.55); }
        .submit-btn:disabled { background: rgba(0, 229, 255, 0.2); color: rgba(255,255,255,0.4); cursor: not-allowed; box-shadow: none; }

        .success-view { text-align: center; padding: 20px 0; }
        .success-hex { margin-bottom: 24px; }
        @keyframes hexSpin { to { transform: rotate(360deg); } }
        .success-title { font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 14px; }
        .success-msg { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 12px; }
        .success-msg strong { color: #00e5ff; }
        .success-subtext { font-size: 13.5px; color: rgba(255,255,255,0.35); line-height: 1.6; margin-bottom: 36px; }
        .success-subtext strong { color: #fff; }
        .confirm-close-btn {
          padding: 12px 40px; border-radius: 50px;
          background: transparent; border: 1.5px solid rgba(0, 229, 255, 0.4);
          color: #00e5ff; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: all 0.3s; font-family: inherit;
        }
        .confirm-close-btn:hover { background: rgba(0, 229, 255, 0.08); border-color: rgba(0, 229, 255, 0.6); }

        @media (max-width: 600px) {
          :global(.modal-card) { padding: 32px 20px; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────────── */
export default function PackagesClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="packages-main">
      <PackagesHero />
      <PricingSection />
      <CompareSection />
      <FAQSection />
      <CTABanner onBookCall={() => setModalOpen(true)} />
      <Footer />

      <AnimatePresence>
        {modalOpen && <BookCallModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

      <style jsx global>{`
        body { background: #060a0f; margin: 0; }
        .packages-main { background: #060a0f; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </main>
  );
}