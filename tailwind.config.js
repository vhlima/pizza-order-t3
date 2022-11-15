/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin') /* eslint-disable-line */

const defaultTheme = require('tailwindcss/defaultTheme'); /* eslint-disable-line */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        ...defaultTheme.colors,
        primary: '#006491',

        'blue-100': '#0078ae',
        'blue-200': '#006491',
        'blue-50': '#b8d6e3',

        'grey-200': '#333',

        'white-200': '#f6f6f6',

        red: '#fa001f',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        'border-grey': {
          'border-color': 'rgba(85, 85, 85, 0.2)',
        },
        '.no-scroll': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
