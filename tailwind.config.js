/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './apps/**/*.{vue,js,ts,jsx,tsx,html}',
    './packages/**/*.{vue,js,ts,jsx,tsx,html}',
    './_shared/**/*.{vue,js,ts,jsx,tsx,html}',
    './index.html',
  ],
  theme: {},
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
