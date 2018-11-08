// Owner Block
{
  requiredScopes: (sources, args, context, info) => {
    return ['owner:{{typeName}}/view']
  },
  providedScopes: (sources, args, context, info) => {
    return sources.map(s => {
      return s.userId == context.user.id ? context.auth.scope : []
    })
  },
  callback: async (sources, args, context, info) => {
    args.userId = context.user.id;
    const results = await context.{{TypeName}}.getManyFor(args);
    const ordered = orderedFor(results, [context.user.id], 'userId', false);
    const ret = reconcileBatchOneToOne(us, ordered, 'userId');

    return ret.map(r => r.length > 0 ? r : null);
  }
},
