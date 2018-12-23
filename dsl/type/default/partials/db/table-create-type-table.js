mig = knex.schema.createTable('{{snake TYPE.name}}', table => {
  table.increments();
  table.timestamps(true, true);

  {{#each TYPE.fields as |FIELD|}}
  {{> db/table-field.js}}
  {{/each}}

  {{> db/table-visibility.js}}

  {{> db/table-create-owned.js}}

  {{> db/table-create-rels-field.js}}
})
migs.push(mig);
