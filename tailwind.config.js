module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        mini: '.7rem',
        'semi-mini': '.8rem',
        tiny: '.9375rem'
      },
      height: {
        container: 'calc(100vh - 70px - 35px - 35px)',
        body: 'calc(100vh - 70px - 35px - 35px - 32px - 32px)'
      },
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#b1c2fb',
          400: '#7694f8',
          500: '#3b66f5',
          600: '#355cdd',
          700: '#2c4db8',
          800: '#233d93',
          900: '#1d3278'
        },
        theme: {
          text: 'rgba(18,18,23,.9)'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}
