{{#if TYPE.search}}
// Search helpers
{{#with TYPE.search as |Search|}}
search: pagingAdapter({
  table: '{{snake TYPE.name}}',
  filters: [
    {{#each Search.fields as |FIELD|}}
    {
      bool: 'or',
      field: '{{snake FIELD}}',
      compare: 'like',
      valueExtractor: args => `${args.searchText}`
    },
    {{/each}}
    {{#each Search.relation as |SearchRel|}}
    // relation {{SearchRel}}
    {{/each}}

  ]
}),
{{/with}}
{{/if}}
