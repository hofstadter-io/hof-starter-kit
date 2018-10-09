import Feature from '../connector';
{{#with DslContext as |APP|}}

{{#each APP.pages as |PAGE|}}
import {{PAGE.name}} from './{{PAGE.name}}';
{{/each}}

export default new Feature(
{{#each APP.pages as |PAGE|}}
  {{PAGE.name}},
{{/each}}
);
{{/with}}
