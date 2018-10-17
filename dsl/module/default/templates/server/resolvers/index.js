{{#with DslContext as |MOD|}}
{{#each MOD.types as |MTYPE| ~}}
{{#gettype MTYPE.type true}}{{#with . as |TYPE| ~}}
import {{camelT TYPE.name}}Resolvers from './{{kebab TYPE.name}}'
{{/with}}{{/gettype ~}}
{{/each}}

/*
import queriesResolvers from './queries';
import mutationResolvers from './mutations';
*/

let obj = {
  Query: {},
  Mutation: {},
  Subscription: {}
};

{{#each MOD.types as |MTYPE| ~}}
{{#gettype MTYPE.type true}}{{#with . as |TYPE| ~}}
obj = {{camelT TYPE.name}}Resolvers(obj);
{{/with}}{{/gettype ~}}
{{/each}}

/*
obj = queriesResolvers(obj);
obj = mutationResolvers(obj);
*/

/* eslint-disable no-unused-vars */
export default pubsub => obj;

{{/with}}

