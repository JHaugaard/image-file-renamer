/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors, fonts, spacing can be added here
      colors: {
        // Example: Add custom brand colors if needed
        // primary: '#...',
      },
    },
  },
  plugins: [],
}
