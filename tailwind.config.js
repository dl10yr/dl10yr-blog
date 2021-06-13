/* eslint-disable prettier/prettier */
module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cdred: '#ff91a7',
        cdblue: '#80c1ff',
        cdorange: '#ffa667',
        blue: {
          450: '#1ea7fd',
        },
      },
    },
    fontFamily: {
      sans: ['Nunito Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
      DEFAULT: '0 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 2px 0 rgba(255, 255, 255, 0.06)',
      md: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
      lg: '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
      xl: '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)',
      '2xl': '0 25px 50px -12px rgba(255, 255, 255, 0.25)',
      '3xl': '0 35px 60px -15px rgba(255, 255, 255, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      none: 'none',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
