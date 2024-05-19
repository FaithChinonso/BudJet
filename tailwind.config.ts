import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#006400",
        secondary: "#013220",
        "light-green": "#F8FFFC",
        "card-green": "#F5FCF7",
        tertiary: "#3F492E",
        tertiary01: "rgba(0,100,0,0.1)",
        tertiary02: "#4BD3A5",
        tertiary03: "#E5E9FE",
        tertiary04: "#1B250A",
        white: "#FFF",
        black1: "#000",
        black2: "#1D1D1D",
        black3: "#282828",
        gray1: "#333",
        gray2: "#4F4F4F",
        gray3: "#828282",
        gray4: "#BDBDBD",
        gray5: "#E0E0E0",
      },
    },
  },
  plugins: [],
};
export default config;
