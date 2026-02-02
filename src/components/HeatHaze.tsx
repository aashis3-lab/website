"use client";

export default function HeatHaze() {
  return (
    <svg className="hidden">
      <defs>
        <filter id="heat-haze">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
        <filter id="desert-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        </filter>
      </defs>
    </svg>
  );
}