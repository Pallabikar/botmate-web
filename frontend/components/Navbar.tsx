"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BubbleMenu from "@/components/BubbleMenu";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Packages", href: "/packages" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollProgress }}
      />

      {/*
        KEY FIX: navbar z-index is now 1200, ABOVE the mobile-menu overlay
        (z-index: 1100). This ensures the hamburger/close button inside the
        navbar is always rendered on top of the full-screen menu.
      */}
      <nav className="navbar">
        {/* LEFT LOGO */}
        <div className="nav-left">
          <Link href="/" className="nav-logo">
            <Image
              src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274506/botmate-icon_t2vtig.png"
              alt="BotMate logo"
              width={90}
              height={90}
              priority
            />
          </Link>
        </div>

        {/* CENTER LINKS */}
        <ul className="nav-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="nav-item">
                <Link href={link.href} className={`nav-link${isActive ? " active" : ""}`}>
                  {link.name}
                  {isActive && (
                    <motion.div layoutId="underline" className="underline" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT CTA */}
        <div className="nav-right">
          <Link href="/get-started" className="nav-cta">
            Get Started
          </Link>
        </div>

        {/* BUBBLE MENU FOR MOBILE */}
        <BubbleMenu
          logo={
            <Image 
              src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274506/botmate-icon_t2vtig.png" 
              alt="BotMate logo" 
              width={40}
              height={40}
            />
          }
          items={[
            { label: 'home', href: '/', ariaLabel: 'Home', rotation: -8, hoverStyles: { bgColor: '#00e5ff', textColor: '#111' } },
            { label: 'about', href: '/about', ariaLabel: 'About Us', rotation: 8, hoverStyles: { bgColor: '#00e5ff', textColor: '#111' } },
            { label: 'services', href: '/services', ariaLabel: 'Services', rotation: 8, hoverStyles: { bgColor: '#00e5ff', textColor: '#111' } },
            { label: 'packages', href: '/packages', ariaLabel: 'Packages', rotation: 8, hoverStyles: { bgColor: '#00e5ff', textColor: '#111' } },
            { label: 'contact', href: '/contact', ariaLabel: 'Contact', rotation: -8, hoverStyles: { bgColor: '#00e5ff', textColor: '#111' } }
          ]}
          menuAriaLabel="Toggle navigation"
          menuBg="#060a0f"
          menuContentColor="#00e5ff"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </nav>

      <style jsx global>{`
        /* ══ SCROLL PROGRESS ══ */
        .progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 3px;
          width: 100%;
          background: #00e5ff;
          transform-origin: left;
          /* Must be above everything */
          z-index: 2000;
        }

        /* ══ NAVBAR ══
           z-index: 1200 — sits ABOVE the mobile overlay (1100)
           so the hamburger/X icon is always visible and tappable.
        ══════════════ */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          background: rgba(4, 8, 15, 0.85);
          background: rgba(4, 8, 15, 0.92);
          z-index: 1200;
        }

        .nav-left { display: flex; align-items: center; }

        .nav-logo img {
          height: 90px;
          width: auto;
          transition: height 0.3s ease;
          display: block;
        }

        /* ══ DESKTOP LINKS ══ */
        .nav-center {
          display: flex;
          justify-content: center;
          gap: 30px;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-item { position: relative; }

        .nav-link {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 10px;
          position: relative;
          transition: color 0.3s, text-shadow 0.3s;
          letter-spacing: 0.5px;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #00e5ff;
          text-shadow: 0 0 12px rgba(0, 229, 255, 0.6);
        }

        .underline {
          position: absolute;
          bottom: -4px; left: 0;
          height: 2px; width: 100%;
          background: #00e5ff;
          border-radius: 2px;
        }

        /* ══ CTA ══ */
        .nav-right { display: flex; justify-content: flex-end; }

        .nav-cta {
          background: #00e5ff;
          padding: 10px 24px;
          border-radius: 50px;
          color: black;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          transition: box-shadow 0.3s, transform 0.3s;
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
        }
        .nav-cta:hover {
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.8);
          transform: translateY(-2px);
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 1024px) {
          .navbar { 
            padding: 0 20px; 
            height: 60px; 
          }
          /* Hide desktop-only elements */
          .nav-center, 
          .nav-right,
          .nav-left { 
            display: none !important; 
          }
          
          .hamburger { 
            display: flex; 
          }
        }

        @media (max-width: 480px) {
          .navbar { 
            padding: 0 16px; 
            height: 60px; 
          }
        }
      `}</style>
    </>
  );
}
