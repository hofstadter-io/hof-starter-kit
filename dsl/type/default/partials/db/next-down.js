// next DOWN
{{#if (eq TYPE.version 1)}}
{{> db/table-delete-type-table.js}}
{{else}}
{{> db/table-downdate-type-table.js}}
{{/if}}
