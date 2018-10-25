obj.User = obj.User || {};
obj.User.{{typeName}} = createBatchResolver(async (sources, args, context, info) => {
  // TODO auth batching

  var us = sources.map(u => {
    u.userId = u.id;
    return u;
  });
  var uids = us.map(u => u.id);



  return sources
});

obj.{{TypeName}}.{{#if TYPE.owned.name}}{{camel TYPE.owned.name}}{{else}}user{{/if}} = createBatchResolver(async (sources, args, context, info) => {
  // TODO auth batching

  var us = await context.User.getUsers();
  us = us.map(u => {
    u.userId = u.id;
    return u;
  })

  const ret = reconcileBatchOneToOne(sources, us, 'userId');
  // console.log("{{TypeName}}.User - batch resolver - users", ret)

  return ret;

});

