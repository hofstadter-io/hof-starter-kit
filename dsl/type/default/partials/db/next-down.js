// next DOWN
{{#if TYPE.firstMigId}}
{{> db/table-downdate-type-table.js}}
{{else}}
{{> db/table-delete-type-table.js}}
{{/if}}
