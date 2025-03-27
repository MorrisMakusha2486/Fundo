/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts,scss}",  // Added scss extension
      "./src/**/*.component.{html,ts,scss}"  // Specifically target component files
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }