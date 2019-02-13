{{#with DslContext as |APP|}}
import ServerModule from '../ServerModule';

import helloHandler from './hello';

{{#each APP.hof-223--proxy-endpoints as |PROXY|}}
import {{camel PROXY.name}} from './{{kebab PROXY.name}}';
{{/each}}

const middleware = app => {
  helloHandler(app);

  {{#each APP.hof-223--proxy-endpoints as |PROXY|}}
  {{camel PROXY.name}}(app);
  {{/each}}

};

var mod = {
  middleware: [middleware],
}

{{/with}}

export default new ServerModule(mod);
