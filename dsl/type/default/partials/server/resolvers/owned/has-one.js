obj.User = obj.User || {};
obj.User.{{typeName}} = createBatchResolver(async (sources, args, context, info) => {
  // TODO auth batching
  const blocks = [

    {{> server/resolvers/owned/has-one-owner.js }}

    {{#if TYPE.visibility.enabled}}

    {{> server/resolvers/owned/has-one-viz-prv.js }}
    {{> server/resolvers/owned/has-one-viz-pub.js }}

    {{else}}

    {{> server/resolvers/owned/has-one-non-viz.js }}

    {{/if}}

  ]

  const options = {
    validator: 'wildcard-i-love-trump'
  }

  // Create the batched auth resolver
  const authResolver = authBatching(blocks, options);

  // Annotate the sources
  const us = sources.map(u => {
    u.userId = u.id;
    return u;
  });

  // Make the actual call
  const results = await authResolver(us, args, context, info)

  // Return empty when not an array (likely an Authzn Error)
  return results.map(r => Array.isArray(r) ? r : [])
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

