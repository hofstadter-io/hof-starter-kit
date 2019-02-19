// Owner Block
{
  requiredScopes: (sources, args, context, info) => {
    return ['owner:{{typeName}}/view']
  },
  providedScopes: (sources, args, context, info) => {
    return sources.map(s => {
      return s.{{ternary (camel TYPE.owned.name) "user"}}Id == context.user.id ? context.auth.scope : []
    })
  },
  callback: async (sources, args, context, info) => {
    args.{{ternary (camel TYPE.owned.name) "user"}}Id = context.user.id;
    const results = await context.{{TypeName}}.getManyFor(args);
    const ordered = orderedFor(results, [context.user.id], '{{ternary TYPE.owned.name "user"}}Id', false);
    const ret = reconcileBatchOneToOne(us, ordered, '{{ternary (camel TYPE.owned.name) "user"}}Id');

    return ret.map(r => r.length > 0 ? r : null);
  }
},
