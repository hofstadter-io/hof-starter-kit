{{#with DslContext as |APP|}}
const url = require('url');

const config = {
  builders: {
    web: {
      entry: './src/index.tsx',
      stack: ['web'],
      openBrowser: false,
      dllExcludes: ['bootstrap'],
    {{#if (eq APP.mode "live")}}
      webpackDevProtocol: "https",
      webpackDevHost: "{{DslContext.package-name}}.live.hofstadter.io",
      webpackDevPort: 443,
    {{/if}}
      defines: {
        __CLIENT__: true
      },
      // Wait for backend to start prior to letting webpack load frontend page
      waitOn: ['tcp:localhost:8080'],
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
    stack: ['apollo', 'react', 'styled-components', 'css', 'sass', 'less', 'es6', 'ts', 'webpack', 'i18next'],
    cache: '../../.cache',
    ssr: true,
    webpackDll: true,
    reactHotLoader: false,
    {{#if (eq APP.mode "live")}}
    sourceMap: false,
    {{/if}}
    defines: {
      __DEV__: process.env.NODE_ENV !== 'production',
    {{#if (eq APP.mode "live")}}
      __API_URL__: '"https://{{APP.package-name}}.live.hofstadter.io/graphql"'
    {{else if (eq APP.mode "prod")}}
      __API_URL__: '"https://{{APP.package-name}}.hofstadter.io/graphql"'
    {{else}}
      __API_URL__: '"/graphql"'
    {{/if}}
    },
    webpackConfig: {
      devServer: {
        disableHostCheck: true
      }
    }
  }
};

config.options.devProxy = config.options.ssr;

if (process.env.NODE_ENV === 'production') {
  // Generating source maps for production will slowdown compilation for roughly 25%
  config.options.sourceMap = false;
}

const extraDefines = {
  __SSR__: config.options.ssr
};

config.options.defines = Object.assign(config.options.defines, extraDefines);

module.exports = config;
{{/with}}
