// mig DOWN - {{MIG_ID}} {{#if (eq MIG_ID TYPE.firstMigId)}} -- DELETE{{/if}}
{{#if (eq MIG.ownMigId 1)}}
{{> db/table-delete-type-table.js}}
{{else}}
{{> db/table-downdate-type-table.js}}
{{/if}}
