/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090A'
      },

      boxShadow: {
        'custom-md': '0 0 40px 1px rgba(0, 0, 0, 0.3)',
      },

      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
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