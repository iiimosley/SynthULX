/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      width: {
        'synth': '63%',
      },
      borderWidth: {
        'piano-key': '0.3vw',
      },
      fontSize: {
        'range-label': '2.1vw',
      },
      colors: {
        sine: 'blue',
        triangle: 'rgb(255, 217, 1)',
        square: 'green',
        sawtooth: 'red',
      },
      boxShadow: {
        'title-osc': '0 0 0.2vw black, 0 0 0.8vw var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
}

