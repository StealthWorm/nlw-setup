/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      boxShadow: {
        'custom-md': '0 0 40px 1px rgba(0, 0, 0, 0.3)',
      },

      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
      },

      gridTemplateColumns: {
        7: 'repeat(7, minmax(0, 1fr))',
      },

      animation: {
        'spin-once': 'spin 0.3s linear',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  // Enable/disable responsive design
  important: true,
  corePlugins: {
    container: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}