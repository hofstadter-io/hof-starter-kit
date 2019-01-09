// mig UP - {{MIG_ID}} {{#if (eq MIG_ID TYPE.firstMigId)}} -- CREATE{{/if}}
{{#each TYPE.migrations as |MIG|}}
{{#if (eq MIG.appMigId MIG.ownMigId)}}
{{#if (eq MIG.ownMigId 1)}}
{{> db/table-create-type-table.js}}
{{else}}
{{> db/table-update-type-table.js}}
{{/if}}
{{/if}}
{{/each}}
