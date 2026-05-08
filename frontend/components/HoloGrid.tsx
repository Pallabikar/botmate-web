"use client";

import React from "react";

export default function HoloGrid() {
  return (
    <div className="holo-grid" aria-hidden="true">
      <style jsx>{`
        .holo-grid {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridShift 20s linear infinite;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          will-change: transform;
          transform: translateZ(0);
        }
        @keyframes gridShift { 0% { background-position: 0 0; } 100% { background-position: 60px 60px; } }
      `}</style>
    </div>
  );
}
