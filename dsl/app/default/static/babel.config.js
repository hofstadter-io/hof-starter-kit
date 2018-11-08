module.exports = {
  compact: false,
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
