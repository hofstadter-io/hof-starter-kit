// next UP
{{#if TYPE.firstMigId}}
{{> db/table-update-type-table.js}}
{{else}}
{{> db/table-create-type-table.js}}
{{/if}}
