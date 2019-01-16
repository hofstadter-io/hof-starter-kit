{{! migrations for: fields, visibility, non-extra table owner/rels}}
{{! this section has slightly different if-else-loop structure from its opposite}}
// mig DOWN - {{MIG_ID}} {{#if (eq MIG_ID TYPE.firstAppMigId)}} -- DELETE{{/if}}
{{#if (int_eq MIG_ID TYPE.firstAppMigId)}}
migs.push(knex.schema.dropTable('{{snake TYPE.name}}'))
{{else}}

mig = knex.schema.table('{{snake TYPE.name}}', table => {

{{#each TYPE.migrations as |TMIG|}}
{{#if (eq TMIG.appMigId MIG_ID)}}
{{#each TMIG.migrations as |MIG|}}
// {{MIG.change}} {{MIG.target}} {{MIG.name}}
{{/each}}
{{/if}}
{{/each}}

})
migs.push(mig);

{{/if}}
