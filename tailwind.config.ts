import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Törtfehér – meleg, papírszerű háttér
        cream: {
          DEFAULT: "#F7F3EC",
          50: "#FBF9F4",
          100: "#F7F3EC",
          200: "#EFE8DA",
          300: "#E3D8C3",
        },
        // Mély bordó – a református hagyomány színe
        burgundy: {
          DEFAULT: "#6E1423",
          50: "#FBEFF1",
          100: "#F2D2D7",
          200: "#D99AA5",
          300: "#B85A6B",
          400: "#933243",
          500: "#6E1423",
          600: "#5A101C",
          700: "#450C16",
          800: "#30080F",
          900: "#1C0509",
        },
        // Arany – prémium kiemelések
        gold: {
          DEFAULT: "#B8924A",
          50: "#FAF5EA",
          100: "#F1E4C6",
          200: "#E3CB94",
          300: "#D2AF63",
          400: "#C49F52",
          500: "#B8924A",
          600: "#977538",
          700: "#71582A",
          800: "#4C3B1C",
          900: "#2A210F",
        },
        // Sötét grafit – szöveg, fejlécek, footer
        graphite: {
          DEFAULT: "#1F2125",
          50: "#F4F5F6",
          100: "#E4E5E7",
          200: "#C5C7CB",
          300: "#9A9DA3",
          400: "#6C6F76",
          500: "#474A50",
          600: "#34373C",
          700: "#26282C",
          800: "#1F2125",
          900: "#141518",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(31,33,37,0.04), 0 8px 24px rgba(31,33,37,0.06)",
        "card-hover": "0 4px 12px rgba(31,33,37,0.08), 0 16px 40px rgba(31,33,37,0.12)",
        premium: "0 20px 60px rgba(110,20,35,0.10)",
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(to bottom, rgba(20,21,24,0.30) 0%, rgba(20,21,24,0.45) 50%, rgba(20,21,24,0.78) 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
