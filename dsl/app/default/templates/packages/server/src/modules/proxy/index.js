import ServerModule from '../ServerModule';

var mod = {};

{{#with DslContext as |APP|}}
{{#if (and (eq APP.client "studios") (eq APP.name "studios"))}}

import helloMiddleware from './hello';

{{#each APP.hof-223--proxy-endpoints as |PROXY|}}
import {{camel PROXY.name}} from './{{kebab PROXY.name}}';
{{/each}}

const middleware = app => {
  helloMiddleware(app);

  {{#each APP.hof-223--proxy-endpoints as |PROXY|}}
  {{camel PROXY.name}}(app);
  {{/each}}

};

mod = {
  middleware: [middleware],
}

{{/if}}
{{/with}}

export default new ServerModule(mod);
