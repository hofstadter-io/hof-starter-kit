{{#with DslContext as |APP|}}
const url = require('url');

const config = {
  builders: {
    server: {
      entry: './src/index.ts',
      stack: ['server'],
      defines: {
        __SERVER__: true
      },
      enabled: true
    },
    test: {
      stack: ['server'],
      roles: ['test'],
      defines: {
        __TEST__: true
      }
    }
  },
  options: {
    stack: ['apollo', 'react', 'styled-components', 'css', 'sass', 'less', 'es6', 'js', 'ts', 'webpack', 'i18next'],
    cache: '../../.cache',
    ssr: true,
    webpackDll: true,
    reactHotLoader: false,
    persistGraphQL: false,
    frontendRefreshOnBackendChange: true,

    {{#if (eq APP.mode "live")}}
    minify: false,
    sourceMap: true,
    {{else if (eq APP.mode "prod")}}
    minify: true,
    sourceMap: false,
    {{else}}
    minify: false,
    sourceMap: true,
    {{/if}}

    defines: {
      __SERVER_PORT__: 8080,

      __API_URL__: '"/graphql"', // Use full URL if API is external, e.g. https://example.com/graphql
    {{#if (eq APP.mode "live")}}
      __DEV__: true,
      __WEBSITE_URL__: '"https://{{APP.package-name}}.live.hofstadter.io"'
    {{else if (eq APP.mode "prod")}}
      __DEV__: false,
      __WEBSITE_URL__: '"https://{{APP.package-name}}.hofstadter.io"'
    {{else}}
      __DEV__: process.env.NODE_ENV !== 'production',
      __WEBSITE_URL__: '"http://localhost:3000"'
    {{/if}}
    },
  }
};

config.options.devProxy = config.options.ssr;

const extraDefines = {
  __SSR__: config.options.ssr,
  __FRONTEND_BUILD_DIR__: `"../client/build"`,
  __DLL_BUILD_DIR__: `"../client/build/dll"`
};

config.options.defines = Object.assign(config.options.defines, extraDefines);

module.exports = config;
{{/with}}
