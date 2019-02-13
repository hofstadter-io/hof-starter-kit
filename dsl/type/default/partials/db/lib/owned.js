{{#if TYPE.owned}}
createFor: createWithoutIdAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
updateFor: updateMultiConditionAdapter({
  table: '{{snake TYPE.name}}',
  idField: 'id',
}),
deleteFor: deleteMultiConditionAdapter({
  printSQL: true,
  table: '{{snake TYPE.name}}',
  idField: 'id',
  filters: [{
    bool: 'and',
    field: 'user_id',
    compare: '=',
    valueExtractor: args => args.userId
  }]
}),

getFor: getAdapter({
  printSQL: true,
  table: '{{snake TYPE.name}}',
  idField: 'id',
  filters: [{
    bool: 'and',
    field: 'user_id',
    compare: '=',
    valueExtractor: args => args.userId
  }]
}),
getManyFor: listAdapter({
  table: '{{snake TYPE.name}}',
  idField: 'user_id',
  filters: [{
    bool: 'and',
    field: 'user_id',
    compare: '=',
    valueExtractor: args => args.userId
  }]
}),
pagingFor: pagingAdapter({
  table: '{{snake TYPE.name}}',
  idField: 'user_id',
  filters: [{
    bool: 'and',
    field: 'user_id',
    compare: '=',
    valueExtractor: args => args.userId
  }]
}),
{{/if}}

