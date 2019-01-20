{{! migrations for: fields, visibility, owned, non-extra table rels}}
{{! this section has slightly different if-else-loop structure from its opposite}}
// mig UP - {{MIG_ID}} {{TYPE.firstAppMigId}} ~ {{#if (eq MIG_ID TYPE.firstAppMigId)}} -- CREATE{{/if}}
{{#if (int_eq MIG_ID TYPE.firstAppMigId)}}
mig = knex.schema.createTable('{{snake TYPE.name}}', table => {
  table.increments();
  table.timestamps(true, true);
{{else}}
mig = knex.schema.table('{{snake TYPE.name}}', table => {
{{/if}}

{{#each TYPE.migrations as |TMIG|}}
{{#if (eq TMIG.appMigId MIG_ID)}}
{{#each TMIG.migrations as |MIG|}}

  // {{MIG.change}} {{MIG.target}}
{{#if (eq MIG.change "create")}}
  {{> db/common/target-create-switch.js}}
{{else if (eq MIG.change "delete")}}
  {{> db/common/target-delete-switch.js}}
{{else if (eq MIG.change "update")}}
  {{> db/common/target-update-switch.js}}
{{else}}
  // UNKNOWN MIG.change '{{MIG.change}}'
{{/if}}

{{/each}}
{{/if}}
{{/each}}

})
migs.push(mig);
