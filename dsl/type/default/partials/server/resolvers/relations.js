{{#with TYPE.auth as |AUTH|}}

{{#each TYPE.relations as |RELATION|}}
{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}

{{#if (eq RELATION.relation "one-to-one")}}
{{> server/resolvers/relations/one-to-one.js}}

{{else if (eq RELATION.relation "one-to-many")}}
{{> server/resolvers/relations/one-to-many.js}}

{{else if (eq RELATION.relation "many-to-many")}}
{{> server/resolvers/relations/many-to-many.js}}

{{else if (eq RELATION.relation "belongs-to-one")}}
{{> server/resolvers/relations/belongs-to-one.js}}

{{else if (eq RELATION.relation "belongs-to-many")}}
{{> server/resolvers/relations/belongs-to-many.js}}

{{/if}}

{{/with}}{{/gettype}}
{{/each}}

{{/with}}
