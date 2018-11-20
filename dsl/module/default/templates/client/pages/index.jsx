{{#with DslContext as |MODULE|}}
import ClientModule from '../../ClientModule';
{{#each MODULE.pages as |PAGE|}}
import {{PAGE.name}} from './{{PAGE.name}}';
{{/each}}

const pages = [
{{#each MODULE.pages as |PAGE|}}
  {{PAGE.name}},
{{/each}}
]

export default ClientModule(...pages);

/*
{{{yaml MODULE}}}
*/

{{/with}}
