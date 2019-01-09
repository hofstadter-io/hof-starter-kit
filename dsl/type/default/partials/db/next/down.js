// next DOWN
{{#each TYPE.next-migrations as |MIG|}}
{{#if (eq TYPE.version 1)}}
{{> db/table-delete-type-table.js}}
{{else}}
{{> db/table-downdate-type-table.js}}
{{/if}}
{{/each}}
