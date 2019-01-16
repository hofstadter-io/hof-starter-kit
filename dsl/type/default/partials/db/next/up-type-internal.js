{{! migrations for: fields, visibility, non-extra table owner/rels}}
{{! this section has slightly different if-else-loop structure from its opposite}}
// next UP - '{{TYPE.firstAppMigId}}' ~ {{#unless TYPE.firstAppMigId}} -- CREATE{{/unless}}
{{#if (int_eq MIG_ID TYPE.firstAppMigId)}}
mig = knex.schema.createTable('{{snake TYPE.name}}', table => {
  table.increments();
  table.timestamps(true, true);
{{else}}
mig = knex.schema.table('{{snake TYPE.name}}', table => {
{{/if}}

{{#each TYPE.next-migrations as |MIG|}}
// {{MIG.change}} {{MIG.target}} {{MIG.name}}
{{/each}}

})
migs.push(mig);
