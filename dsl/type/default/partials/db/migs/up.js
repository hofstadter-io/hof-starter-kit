// mig UP - {{MIG_ID}} {{TYPE.firstAppMigId}} ~ {{#if (eq MIG_ID TYPE.firstAppMigId)}} -- CREATE{{/if}}
{{#each TYPE.migrations as |MIG|}}
{{#if (eq MIG.appMigId MIG_ID)}}
{{#if (eq MIG.ownMigId 1)}}
{{> db/table-create-type-table.js}}
{{else}}
{{> db/table-update-type-table.js}}
{{/if}}
{{/if}}
{{/each}}
