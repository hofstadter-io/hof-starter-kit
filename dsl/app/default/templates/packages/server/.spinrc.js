{{#with DslContext as |APP|}}
const url = require('url');

var os = require('os');
var ifaces = os.networkInterfaces();
var hostIP = "";

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    // skip docker
    if (ifname.substring(0,6) === "docker") {
      return
    }

    if (ifname.substring(0,7) === "vboxnet") {
      return
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
      hostIP = iface.address;
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      hostIP = iface.address;
    }
    ++alias;
  });
});

const config = {
  builders: {
    server: {
      entry: './src/index.ts',
      stack: ['server'],
      defines: {
        __SERVER__: true
      },
      //  enabled: process.env.HOF_SERVER_COMPONENT === 'true' ? true : false
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
    // cache: false,
    webpackDll: true,
    reactHotLoader: false,
    persistGraphQL: false,
    frontendRefreshOnBackendChange: true,

    {{#if (eq APP.mode "live")}}
    ssr: false,
    minify: true,
    sourceMap: false,
    {{else if (eq APP.mode "prod")}}
    ssr: false,
    minify: true,
    sourceMap: false,
    {{else}}
    ssr: false,
    minify: false,
    sourceMap: true,
    {{/if}}

    defines: {
      __SERVER_PORT__: process.env.HOF_SERVER_COMPONENT === 'true' ? 8081 : 8080,

    {{#if (eq APP.mode "live")}}
      __DEV__: true,
      __API_URL__: '"/graphql"', // Use full URL if API is external, e.g. https://example.com/graphql
      __WEBSITE_URL__: '"https://{{APP.name}}.live.hofstadter.io"'
    {{else if (eq APP.mode "prod")}}
      __DEV__: false,
      __API_URL__: '"/graphql"', // Use full URL if API is external, e.g. https://example.com/graphql
      __WEBSITE_URL__: '"https://{{APP.name}}.hofstadter.io"'
    {{else}}
      __DEV__: process.env.NODE_ENV !== 'production',
      __API_URL__: `"/graphql"`, // Use full URL if API is external, e.g. https://example.com/graphql
      __WEBSITE_URL__: `"http://${hostIP}:3000"`
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

console.log("DEFINES", config.options.defines)

module.exports = config;
{{/with}}
