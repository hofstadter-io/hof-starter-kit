// table - update
mig = knex.schema.table('{{snake TYPE.name}}', table => {

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
