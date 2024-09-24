/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",  // Kök dizindeki App dosyalarını içerir
    "./app/**/*.{js,jsx,ts,tsx}",  // app klasörü altındaki tüm dosyalar
    "./app/*.{js,jsx,ts,tsx}",  // app klasörünün hemen altındaki dosyalar
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};