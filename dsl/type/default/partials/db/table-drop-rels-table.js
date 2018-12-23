{{#each TYPE.relations as |RELATION|}}
{{#if (eq RELATION.relation "many-to-many")}}
{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
// many-to-many table
migs.push(knex.schema.dropTable('{{snake TYPE.name}}__{{snake REL_TYPE.name}}'))
{{/with}}{{/gettype}}
{{/if}}
{{/each}}
