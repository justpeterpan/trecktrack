const formKitTailwind = require('@formkit/themes/tailwindcss')

module.exports = {
  theme: {},
  plugins: [formKitTailwind],
  content: ['./src/**/*.vue', './formkit.config.ts'],
}
