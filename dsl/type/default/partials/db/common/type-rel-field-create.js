{{#gettype REL.type true}}{{#with . as |REL_TYPE|}}
{{#if (eq REL.relation "belongs-to-one")}}
table
  .integer('{{snake REL_TYPE.name}}_id')
  .unsigned()
  .notNullable()
{{! look for a one-2-one relation and enforce with unique}}
{{#each REL_TYPE.relations as |R2|}}
{{#if (eq REL.type R2.parent_path)}}
{{#if (eq R2.relation "one-to-one")}}
  .unique()
{{/if}}
{{/if}}
{{/each}}
  .references('id')
  .inTable('{{snake REL_TYPE.name}}')
  .onDelete('CASCADE');

table.index('{{snake REL_TYPE.name}}_id');

{{/if}}
{{/with}}{{/gettype}}
