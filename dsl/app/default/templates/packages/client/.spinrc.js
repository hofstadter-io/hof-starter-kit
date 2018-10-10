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
      webpackDevHost: "{{DslContext.name}}.live.hofstadter.io",
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
    // cache: false,
    ssr: true,
    webpackDll: true,
    reactHotLoader: false,

    {{#if (eq APP.mode "live")}}
    minify: true,
    sourceMap: false,
    {{else if (eq APP.mode "prod")}}
    minify: true,
    sourceMap: false,
    {{else}}
    minify: false,
    sourceMap: true,
    {{/if}}

    defines: {

    {{#if (eq APP.mode "live")}}
      __DEV__: true,
      __API_URL__: '"https://{{APP.name}}.live.hofstadter.io/graphql"'
    {{else if (eq APP.mode "prod")}}
      __DEV__: false,
      __API_URL__: '"https://{{APP.name}}.hofstadter.io/graphql"'
    {{else}}
      __DEV__: process.env.NODE_ENV !== 'production',
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

const extraDefines = {
  __SSR__: config.options.ssr
};

config.options.defines = Object.assign(config.options.defines, extraDefines);

module.exports = config;
{{/with}}
