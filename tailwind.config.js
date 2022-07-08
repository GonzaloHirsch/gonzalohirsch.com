/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'text': ['Open Sans', 'sans-serif'],
        'highlight': ['Inter', 'sans-serif']
      },
      colors: {
        'brand_primary_light': '#124BCF',
        'brand_secondary_light': '#12A9CF',
        'typography_primary_light': '#000000',
        'background_light': '#ffffff',
        'brand_primary_dark': '#DF9A2C',
        'brand_secondary_dark': '#df412c',
        'typography_primary_dark': '#eeeeee',
        'background_dark': '#151515',
        'light': '#F7F7F7'
      },
      fontSize: {
        'sm': '0.75rem',
        'base': '1rem',
        'highlight': '5rem',
        'h1': '4rem',
        'h2': '3rem',
        'h3': '2rem',
        'h4': '1.5rem',
        'h5': '1.25rem',
        'highlight-sm': '3.5rem',
        'h1-sm': '3rem',
        'h2-sm': '2.25rem',
        'h3-sm': '1.75rem',
        'h4-sm': '1.5rem',
        'h5-sm': '1.25rem'
      },
      lineHeight: {
        'sm': '1rem',
        'base': '1.35rem',
        'highlight': '5.5rem',
        'h1': '4.25rem',
        'h2': '3.25rem',
        'h3': '2.25rem',
        'h4': '1.75rem',
        'h5': '1.5rem',
        'highlight-sm': '3.75rem',
        'h1-sm': '3.25rem',
        'h2-sm': '2.5rem',
        'h3-sm': '2rem',
        'h4-sm': '1.75rem',
        'h5-sm': '1.5rem',
      },
      padding: {
        'section-x-sm': '1.5rem',
        'section-x': '5rem',
        'section-y-sm': '3rem',
        'section-y': '5rem'
      },
      boxShadow: {
        // One example using shadow-lg -> shadow-lg-invert
        'dark-shadow': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
      },
      spacing: {
        'nav': '4rem',
        'section-x': '5rem',
      }
    },
  },
  plugins: [],
}
