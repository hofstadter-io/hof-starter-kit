import ClientModule from '../ClientModule';

import navbar from './navbar';

{{#if DslContext.layout.drawer.enabled}}
import drawer from './drawer';
{{/if}}

import footer from './footer';

export default new ClientModule(
  navbar,
  {{#if DslContext.layout.drawer.enabled}}
  drawer,
  {{/if}}
  footer
);
