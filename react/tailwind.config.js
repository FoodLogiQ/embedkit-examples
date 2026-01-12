/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        'lg': '16px',
        'md': '12px',
        'sm': '10px', 
      }
    }
  },
  plugins: [],
}