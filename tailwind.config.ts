import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        meteor: {
          "0%": { transform: "translateY(-20%) translateX(-50%)" },
          "100%": { transform: "translateY(300%) translateX(-50%)" },
        },
        earth: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "reveal-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "my-spin-slow": "earth 20s linear infinite",
        "marquee-horizontal": "marquee-x var(--duration) infinite linear",
        "reveal-up": "reveal-up 1s ease-in-out forwards",
        meteor: "meteor var(--duration) var(--delay) ease-in-out infinite",
      },
      fontFamily: {
        tungsten: ["Tungsten", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
