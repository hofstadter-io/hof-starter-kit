{{#with DslContext as |TYPE|}}
import ClientModule from '../../../ClientModule';
{{#each TYPE.pages as |PAGE|}}
import {{camelT PAGE.name}} from './{{kebab PAGE.name}}';
{{/each}}

const pages = [
{{#each TYPE.pages as |PAGE|}}
  {{camelT PAGE.name}},
{{/each}}
]

export default new ClientModule(...pages);

{{/with}}
