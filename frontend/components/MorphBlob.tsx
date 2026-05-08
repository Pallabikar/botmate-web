"use client";

import React from "react";

export default function MorphBlob({ className }: { className?: string }) {
  return (
    <div className={`morph-blob ${className}`} aria-hidden="true">
      <style jsx>{`
        .morph-blob {
          position: absolute; 
          width: 400px; 
          height: 400px;
          background: radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%);
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          animation: blobMorph 8s ease-in-out infinite alternate;
          filter: blur(40px);
          will-change: transform;
          transform: translateZ(0);
          pointer-events: none;
        }
        @keyframes blobMorph {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(0, 0) scale(1); }
          50% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%; transform: translate(20px, -30px) scale(1.1); }
          100% { border-radius: 30% 70% 50% 50% / 60% 40% 70% 30%; transform: translate(-10px, 20px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}
