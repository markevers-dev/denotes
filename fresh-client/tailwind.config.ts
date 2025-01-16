import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: {
          primary: "#70ffaf",
          secondary: "#f472b6",
          black: "#0d0d0d",
          offBlack: "#1a1a1a",
          darkGray: "#262626",
          white: "#ffffff",
          offWhite: "#f2f2f2",
        },
      },
      fontFamily: {
        "dynapuff": ["DynaPuff", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "selector",
} satisfies Config;
