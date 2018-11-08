module.exports = {
  compact: false,
  presets: ['babel-preset-expo'],
  plugins: [
    'haul/src/utils/fixRequireIssues',
    ['styled-components', { ssr: true }]
  ],
  env: {
    production: {
      compact: true
    }
  }
};
