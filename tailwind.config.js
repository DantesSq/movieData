/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {
      colors: {
        'primary': '#6941C6',
        'bg': '#f6f6f6',
      },
      cursor: {
        'cat': 'url(https://cdn.custom-cursor.com/db/pointer/32/Bongo_Cat_Pointer.png), pointer',
      }
    },
  },
  plugins: [],
}

