// import { Flowbite } from 'flowbite-react';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      open: ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        accent: {
          1: 'var(--accent-1)',
          2: 'var(--accent-2)',
          3: 'var(--accent-3)',
          4: 'var(--accent-4)',
          5: 'var(--accent-5)',
        },
        content: 'var(--text-color)',
        theme: 'var(--bg-color)',
      },
    },
  },
  plugins: [
    
  ]

};




