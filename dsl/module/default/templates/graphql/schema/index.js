{{#with DslContext as |MOD| ~}}
{{#each MOD.types as |MTYPE| ~}}
{{#gettype MTYPE.type true}}{{#with . as |TYPE|}}
import {{camelT TYPE.name}}Schema from './{{kebab TYPE.name}}.graphql';
{{/with}}{{/gettype ~}}
{{/each}}

let schema = [
{{#each MOD.types as |MTYPE| ~}}
{{#gettype MTYPE.type true}}{{#with . as |TYPE|}}
{{!}}  {{camelT TYPE.name}}Schema,
{{/with}}{{/gettype ~}}
{{/each}}
];

const exportedSchema = schema;

export default exportedSchema;
{{/with}}
