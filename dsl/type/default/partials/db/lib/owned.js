{{#if TYPE.owned}}
createFor: createWithoutIdAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),

updateFor: updateMultiConditionAdapter({
  table: '{{snake TYPE.name}}',
  idField: 'id',
  filters: [{
    bool: 'and',
    field: '{{ternary TYPE.owned.name "user_id"}}',
    compare: '=',
    valueExtractor: args => args.userId
  }]
}),

deleteFor: deleteMultiConditionAdapter({
  printSQL: true,
  table: '{{snake TYPE.name}}',
  idField: 'id',
  filters: [{
    bool: 'and',
    field: '{{ternary TYPE.owned.name "user_id"}}',
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
    field: '{{ternary TYPE.owned.name "user_id"}}',
    compare: '=',
    valueExtractor: args => args.userId
  }]
}),

getOneFor: getAdapter({
  printSQL: true,
  table: '{{snake TYPE.name}}',
  idField: '{{ternary TYPE.owned.name "user_id"}}',
  // TODO idField or plain 'field'
}),

getManyFor: listAdapter({
  printSQL: true,
  table: '{{snake TYPE.name}}',
  // TODO idField or plain 'field' or nothing at all
  field: '{{ternary TYPE.owned.name "user_id"}}',
  filters: [{
    bool: 'and',
    field: '{{ternary TYPE.owned.name "user_id"}}',
    compare: '=',
    valueExtractor: args => args.userId
  }]
}),

pagingFor: pagingAdapter({
  printSQL: true,
  table: '{{snake TYPE.name}}',
  // TODO idField or plain 'field' or nothing at all
  field: '{{ternary TYPE.owned.name "user_id"}}',
  filters: [{
    bool: 'and',
    field: '{{ternary TYPE.owned.name "user_id"}}',
    compare: '=',
    valueExtractor: args => args.userId
  }]
}),
{{/if}}

