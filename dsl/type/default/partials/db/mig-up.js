// mig UP - {{MIG_ID}} {{#if (eq MIG_ID TYPE.firstMigId)}} -- CREATE{{/if}}
{{#if (eq MIG_ID TYPE.firstMigId)}}
{{> db/table-create-type-table.js}}
{{else}}
{{> db/table-update-type-table.js}}
{{/if}}
