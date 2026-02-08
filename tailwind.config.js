/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      screens: {
        s: { max: "768px" },
        m: { max: "1024px" },
        l: { max: "1440px" },
      },
    },
  },
  plugins: [],
};
