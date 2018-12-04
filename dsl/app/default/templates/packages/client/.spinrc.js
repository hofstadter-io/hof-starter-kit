{{#with DslContext as |APP|}}
const url = require('url');

var os = require('os');
var ifaces = os.networkInterfaces();
var hostIP = "";
var minikubeIP = process.env.MINIKUBE_IP;

console.log("MINIKUBE", process.env.MINIKUBE)

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
    web: {
      entry: './src/index.tsx',
      stack: ['web'],
      openBrowser: false,
      dllExcludes: ['bootstrap'],
    {{#if (eq env.MINIKUBE "yes")}}
      webpackDevProtocol: "http",
      webpackDevHost: `${minikubeIP}`,
      webpackDevPort: 80,
    {{else if (eq APP.mode "live")}}
      webpackDevProtocol: "https",
      webpackDevHost: "{{DslContext.name}}.live.hofstadter.io",
      webpackDevPort: 443,
    {{else if (eq APP.mode "prod")}}
    {{else}}
      webpackDevHost: `${hostIP}`,
    {{/if}}
      defines: {
        __CLIENT__: true
      },
      // Wait for backend to start prior to letting webpack load frontend page
      waitOn: ['tcp:localhost:8081'],
      enabled: true
      // enabled: process.env.HOF_CLIENT_COMPONENT === 'true' ? true : false
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
    webpackDll: true,
    reactHotLoader: false,
    ssr: false,

    {{#if (eq env.MINIKUBE "yes")}}
    minify: false,
    sourceMap: true,
    {{else if (eq APP.mode "live")}}
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

    {{#if (eq env.MINIKUBE "yes")}}
      __DEV__: true,
      __API_URL__: `"http://${minikubeIP}/graphql"`
    {{else if (eq APP.mode "live")}}
      __DEV__: true,
      __API_URL__: '"https://{{APP.name}}.live.hofstadter.io/graphql"'
    {{else if (eq APP.mode "prod")}}
      __DEV__: false,
      __API_URL__: '"https://{{APP.name}}.hofstadter.io/graphql"'
    {{else}}
      __DEV__: process.env.NODE_ENV !== 'production',
      __API_URL__: `"http://${hostIP}:8081/graphql"`
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

