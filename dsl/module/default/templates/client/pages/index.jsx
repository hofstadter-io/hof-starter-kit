{{#with DslContext as |MODULE|}}
import ClientModule from '../../ClientModule';
{{#each MODULE.pages as |PAGE|}}
import {{camelT PAGE.name}} from './{{kebab PAGE.name}}';
{{/each}}

const pages = [
{{#each MODULE.pages as |PAGE|}}
  {{camelT PAGE.name}},
{{/each}}
]

export default new ClientModule(...pages);

/*
{{{yaml MODULE}}}
*/

{{/with}}
