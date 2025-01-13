/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#121212',
          primary: '#1E1E1E',
          secondary: '#2C2C2C',
          text: '#E0E0E0',
          accent: '#BB86FC',
        },
        light: {
          background: '#FFFFFF',
          primary: '#F5F5F5',
          secondary: '#E0E0E0',
          text: '#000000',
          accent: '#6200EE',
        }
      }
    },
  },
  plugins: [],
}