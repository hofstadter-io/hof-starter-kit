// mig DOWN - {{MIG_ID}} {{#if (eq MIG_ID TYPE.firstAppMigId)}} -- DELETE{{/if}}
{{#each TYPE.migrations as |MIG|}}
{{#if (eq MIG.appMigId MIG_ID)}}
{{#if (eq MIG.ownMigId 1)}}
{{> db/table-delete-type-table.js}}
{{else}}
{{> db/table-downdate-type-table.js}}
{{/if}}
{{/if}}
{{/each}}
