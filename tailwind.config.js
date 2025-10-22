/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        expired: '#ef4444',
        critical: '#f97316',
        warning: '#eab308',
        normal: '#22c55e',
      },
    },
  },
  plugins: [],
}
