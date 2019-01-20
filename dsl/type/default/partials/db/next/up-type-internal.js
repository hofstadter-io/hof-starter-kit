{{! migrations for: fields, visibility, non-extra table owner/rels}}
{{! this section has slightly different if-else-loop structure from its opposite}}
// next UP - '{{TYPE.firstAppMigId}}' ~ {{#unless TYPE.firstAppMigId}} -- CREATE{{/unless}}
{{#if TYPE.version}}
mig = knex.schema.table('{{snake TYPE.name}}', table => {
{{else}}
mig = knex.schema.createTable('{{snake TYPE.name}}', table => {
  table.increments();
  table.timestamps(true, true);
{{/if}}

{{#each TYPE.hof-migs as |TMIG|}}
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
{{/each}}

})
migs.push(mig);
