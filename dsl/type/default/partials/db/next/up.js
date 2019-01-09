// next UP
{{#each TYPE.next-migrations as |MIG|}}
{{#if (eq TYPE.version 1)}}
{{> db/table-create-type-table.js}}
{{else}}
{{> db/table-update-type-table.js}}
{{/if}}
{{/each}}
