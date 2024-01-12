/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include JS, JSX, TS, and TSX files in src/
    // Add other paths if necessary
  ],
    theme: {
    extend: {
      height:{
        "90p":"90%",
        "10p":"10%"
      }
    },
  },
  plugins: [],
}

