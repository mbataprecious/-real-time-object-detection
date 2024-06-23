import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#0E76A8",
        secondary: "#F7931E",
      },
      boxShadow: {
        "custom-purple": "0 8px 16px #7B68EE66",
      },
      animation: {
        "rotate-center": "rotate-center 0.7s linear infinite both",
      },
      keyframes: {
        "rotate-center": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
