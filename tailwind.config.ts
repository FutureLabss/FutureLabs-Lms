import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // screens: {
      //   xsm: "320px",
      //   xxs: "375px",
      //   xs: "425px",
      //   sm: "640px",
      //   md: "768px",
      //   lg: "1024px",
      //   xl: "1280px",
      //   xxl: "1440px",
      //   "2xl": "1536px",
      // },
      screens: {
        xs: "10px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        background: "#1D1B33",
        foreground: "var(--foreground)",
        primary: "#212C4A", // Default primary color if CSS variable is not found
        secondary: "#F57F20",
        "blue-74": "#212C4A"
      },
     
    },
  },
  plugins: [],
} satisfies Config;
