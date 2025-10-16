/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17149A',
        secondary: '#EAB816',
        'blue-1': '#3E447B',
        'blue-2': '#5C68CE',
        'red-1': '#DF5555',
        'green-1': '#36b092',
      },
      fontFamily: {
        sans: ['Work Sans'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
