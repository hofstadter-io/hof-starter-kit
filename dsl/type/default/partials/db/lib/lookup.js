{{#if TYPE.lookup}}
// Lookup helpers
{{#each TYPE.lookup as |LOOKUP|}}
lookupBy{{camelT LOOKUP.name}}: getAdapter({
  // printSQL: true,
  table: '{{snake TYPE.name}}',
  idField: '{{snake LOOKUP.field}}'
}),
{{#if TYPE.owned}}
lookupBy{{camelT LOOKUP.name}}For: getAdapter({
  // printSQL: true,
  table: '{{snake TYPE.name}}',
  idField: '{{snake LOOKUP.field}}',
  filters: [{
    bool: 'and',
    field: 'user_id',
    compare: '=',
    valueExtractor: args => args.userId
  }]
}),
{{/if}}
{{/each}}
{{/if}}

