{{#with DslContext as |MODULE|}}
{{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE| ~}}
import {{camelT TYPE.name}} from './{{kebab TYPE.name}}';
{{/with}}{{/gettype ~}}{{/each}}

export default {
  {{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE|}}
  {{camelT TYPE.name}}{{#unless @last}},{{/unless ~}}
  {{/with}}{{/gettype ~}}{{/each}}
}

{{/with}}
