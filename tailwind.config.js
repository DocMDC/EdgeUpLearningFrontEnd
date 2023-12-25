/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        100: '#ffffff', /* white */
        200: '#f9fafb', /* light gray */
        300: '#f3f3f4', /* medium gray gray */
        400: '#ebebeb', /* dark gray */
        500: '#65656a',  /* very dark gray */
        600: '#00beac', /* primary green */
        700: '#009989', /* highlight green */
        800: '#0b2033', /* alternative dark */
        front: {
          100: '#ffffff', /* white */
          200: '#f6f7f9', /* light gray */
          300: '#eef2f5', /* darker gray */
          400: '#d1ecef', /* light green/blue */
          500: '#0ea6b9', /* darker green/blue */
          600: '#047d89', /* darkest green/blue */
          700: '#11a980', /* forest green */
        },
        dm: {
          100: '#ffffff',
          200: '#a1ddfe',
          300: '#444444',
          400: '#000000'
        },
        exam: {
          primary: '#d7dced;',
          secondary: '#004975',
          primaryText: 'black',
          secondaryText: '#fcfcfc',
          navOdd: '#e2e2e2',
          mainBG: '#d7dced',
          secondaryBG: '#fcfcfc',
          gray: '#717172',
          lightGray: '#D3D3D3',
          boxShadow: '#4783bd',
          labContent: '#d7dcec',
          white: 'white',
          black: 'black'
        },
        t: {
          100: '#ffffff', 
          300: '#00beac',
          400: '#0b2033'
        },
        public: {
          100: '#f9fafb', /* secondary gray/white */
          200: '#00beac', /* primary green */
          300: '#009989', /* highlight green */
          400: '#0b2033', /* alternative dark */
        },
        primary: '#00beac',
        secondary: '#f9fafb',
        alternative: '#0b2033',
        highlight: '#009989',
        qbank: {
          bg: {
            100: '#ffffff',
            200: '#f3f3f4',
            300: '#2296f3',
            400: '#2f4051',
            500: '#27384a',
          },
          text: {
            100: '#ffffff',
            200: '#a7b1c2',
            300: '#c4c4c5',
            400: '#2296f3',
            500: '#212529'
          }
        }
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': {transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'},
          '50%': {transform: 'translateY(0%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'}
        }
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite'
      }
    },
  },
  plugins: [],
}