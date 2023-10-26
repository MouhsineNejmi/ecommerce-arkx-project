/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    stroke: {
      black: '#050301',
      white: '#ffffff',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      open: ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        accent: {
          1: '#2965ff',
          2: '#3d84ff',
          3: '#61a8ff',
          4: '#85ceff',
          5: '#a8f1ff',
        },
        black: '#050301',
        white: '#ffffff',
        gray: {
          1: '#5F5F5F',
          2: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
};
