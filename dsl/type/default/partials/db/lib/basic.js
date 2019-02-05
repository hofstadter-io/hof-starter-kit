create: createWithoutIdAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
update: updateAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
delete: deleteAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),

select: selectAdapter({ table: '{{snake TYPE.name}}' }),
get: getAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
getMany: listAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
paging: pagingAdapter({ table: '{{snake TYPE.name}}', idField: 'id', printSQL: true}),
