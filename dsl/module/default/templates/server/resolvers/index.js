{{#with DslContext as |MOD|}}
{{#each MOD.types as |MTYPE| ~}}
{{#gettype MTYPE.type true}}{{#with . as |TYPE| ~}}
import {{camelT TYPE.name}}Resolvers from './{{kebab TYPE.name}}'
{{/with}}{{/gettype ~}}
{{/each}}

let obj = {
  Query: {},
  Mutation: {},
  Subscription: {}
};

/* eslint-disable no-unused-vars */
export default pubsub => {

  {{#each MOD.types as |MTYPE| ~}}
  {{#gettype MTYPE.type true}}{{#with . as |TYPE| ~}}
  obj = {{camelT TYPE.name}}Resolvers(obj, pubsub);
  {{/with}}{{/gettype ~}}
  {{/each}}

  return obj;
};

{{/with}}

