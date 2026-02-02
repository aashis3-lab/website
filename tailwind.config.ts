import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F6", // Off White / Pearl
        foreground: "#3D342B", // Deep Warm Brown
        sand: "#E6E2D8", // Light Dune
        terracotta: "#BC6C4A", // Burnt Sienna (More Orange, Less Pink)
        dusk: "#B8AFA6", // Warm Grey
        night: "#4A3B32", // Deep Brown
        cream: "#FFFFFF", // Pure White
        stone: "#D1CBC1", // Stone Grey
        gold: "#C6A664", // Muted Gold
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        'grain': "url('/noise.png')",
      },
      borderRadius: {
        'arch': '100px 100px 0 0',
        'arch-inverted': '0 0 100px 100px',
        'dune': '60% 40% 40% 60% / 60% 40% 60% 40%',
        'slab': '3rem 4rem 1rem 1rem',
        'slab-reverse': '4rem 3rem 1rem 1rem',
      },
      animation: {
        blob: "blob 7s infinite",
        float: 'float 6s ease-in-out infinite',
        'heat-haze': 'heatHaze 2s infinite linear',
        scroll: 'scroll 40s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        heatHaze: {
          '0%': { filter: 'blur(0px) skewX(0deg)' },
          '50%': { filter: 'blur(1px) skewX(1deg)' },
          '100%': { filter: 'blur(0px) skewX(0deg)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
