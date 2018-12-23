{{#each TYPE.relations as |RELATION|}}
{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
{{#if (eq RELATION.relation "belongs-to-one")}}
table
  .integer('{{snake REL_TYPE.name}}_id')
  .unsigned()
  .notNullable()
  .references('id')
  .inTable('{{snake REL_TYPE.name}}')
  .onDelete('CASCADE');

table.index('{{snake REL_TYPE.name}}_id');
{{/if}}
{{/with}}{{/gettype}}
{{/each}}
