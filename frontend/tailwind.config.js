/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#ff91a4",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      keyframes: {
        modalPop: {
          "0%": {
            opacity: 0,
            transform: "translate(-50%, -40%) scale(0.85)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        modalClose: {
          "0%": {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          },
          "100%": {
            opacity: 0,
            transform: "translate(-50%, -40%) scale(0.85)",
          },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        modalPop: "modalPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        modalClose: "modalClose 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [],
};
