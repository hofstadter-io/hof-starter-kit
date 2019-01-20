{{#if (eq REL.relation "many-to-many")}}
{{#gettype REL.type true}}{{#with . as |REL_TYPE|}}
// many-to-many table
mig = knex.schema.createTable('{{snake TYPE.name}}__{{snake REL_TYPE.name}}', table => {
  table.increments();
  table.timestamps(true, true);
  table
    .integer('{{snake TYPE.name}}_id')
    .unsigned()
    .notNullable()
    .references('{{snake TYPE.name}}.id')
    .onDelete('CASCADE');
  table
    .integer('{{snake REL_TYPE.name}}_id')
    .unsigned()
    .notNullable()
    .references('{{snake REL_TYPE.name}}.id')
    .onDelete('CASCADE');

  table.index(['{{snake TYPE.name}}_id', '{{snake REL_TYPE.name}}_id']);
})

migs.push(mig);

{{/with}}{{/gettype}}
{{/if}}
