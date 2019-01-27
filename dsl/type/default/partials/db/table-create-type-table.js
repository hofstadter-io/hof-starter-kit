mig = knex.schema.createTable('{{snake TYPE.name}}', table => {
  table.increments();
  table.timestamps(true, true);

  {{#each TYPE.fields as |FIELD|}}
  {{#if FIELD.appMigId}}
    {{#if (eq MIG_ID FIELD.appMigId)}}
      {{> db/table-create-type-field.js}}
    {{/if}}
  {{else}}
    {{#unless MIG_ID}}
      {{> db/table-create-type-field.js}}
    {{/unless}}
  {{/if}}
  {{/each}}

})
migs.push(mig);
