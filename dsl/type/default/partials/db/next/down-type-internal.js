{{! migrations for: fields, visibility, non-extra table owner/rels}}
{{! this section has slightly different if-else-loop structure from its opposite}}
// next DOWN - '{{TYPE.firstAppMigId}}' ~ {{#unless TYPE.firstAppMigId}} -- DELETE{{/unless}}
{{#if (int_eq MIG_ID TYPE.firstAppMigId)}}
migs.push(knex.schema.dropTable('{{snake TYPE.name}}'))
{{else}}

mig = knex.schema.table('{{snake TYPE.name}}', table => {

{{#each TYPE.next-migrations as |MIG|}}
// {{MIG.change}} {{MIG.target}} {{MIG.name}}
{{/each}}

})
migs.push(mig);

{{/if}}
