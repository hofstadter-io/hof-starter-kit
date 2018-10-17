{{#if TYPE.owned}}
{{#if (eq TYPE.owned.type "has-one")}}
// User -> {{typeName}}s
obj.User = obj.User || {};
obj.User.{{typeName}} = createBatchResolver(async (sources, args, context, info) => {

  return sources
});

// {{TypeName}} -> {{#if TYPE.owned.name}}{{camel TYPE.owned.name}}{{else}}user{{/if}}
obj.{{TypeName}}.{{#if TYPE.owned.name}}{{camel TYPE.owned.name}}{{else}}user{{/if}} = createBatchResolver(async (sources, args, context, info) => {
  /*
  var ids = sources.map(s => s.userId);
  console.log("{{TypeName}}.User - batch resolver - ids", ids)
  */

  var us = await context.User.getUsers();
  us = us.map(u => {
    u.userId = u.id;
    return u;
  })
  // console.log("{{TypeName}}.User - batch resolver - users", us)


  const ret = reconcileBatchOneToOne(sources, us, 'userId');
  // console.log("{{TypeName}}.User - batch resolver - users", ret)

  return ret;

});

{{/if}}
{{#if (eq TYPE.owned.type "has-many")}}
// User -> {{typeName}}s
obj.User = obj.User || {};
obj.User.{{typeName}}s = createBatchResolver(async (sources, args, context, info) => {

  return sources
});

// {{TypeName}} -> {{#if TYPE.owned.name}}{{camel TYPE.owned.name}}{{else}}user{{/if}}
obj.{{TypeName}}.{{#if TYPE.owned.name}}{{camel TYPE.owned.name}}{{else}}user{{/if}} = createBatchResolver(async (sources, args, context, info) => {
  /*
  var ids = sources.map(s => s.userId);
  console.log("{{TypeName}}.User - batch resolver - ids", ids)
  */

  var us = await context.User.getUsers();
  us = us.map(u => {
    u.userId = u.id;
    return u;
  })
  // console.log("{{TypeName}}.User - batch resolver - users", us)


  const ret = reconcileBatchOneToOne(sources, us, 'userId');
  // console.log("{{TypeName}}.User - batch resolver - users", ret)

  return ret;

});

{{/if}}
{{/if}}
