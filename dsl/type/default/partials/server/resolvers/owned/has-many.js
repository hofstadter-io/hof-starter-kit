obj.User = obj.User || {};
obj.User.{{typeName}}s = createBatchResolver(async (sources, args, context, info) => {
  // TODO auth batching

  const blocks = [
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
				const ret = reconcileBatchOneToMany(us, ordered, 'userId');

        return ret.map(r => r.length > 0 ? r : null);
      }
    },

    // Non-owner Blocks
    {{#if TYPE.visibility.enabled}}
    // private-visibility view
    {
      requiredScopes: (sources, args, context, info) => {
        {{#if AUTH.view.private}}
        {{#each AUTH.view.private as |ROLE|}}
        return [
          '{{ROLE}}:{{typeName}}/view'{{#unless @last}},{{/unless}}
        ]
        {{/each}}
        {{else}}
        return [];
        {{/if}}
      },
      providedScopes: (sources, args, context, info) => {
        return sources.map(s => context.auth.scope)
      },
      callback: async (sources, args, context, info) => {
        var uids = sources.filter(s => s !== null).map(s => s.userId);

        args.filters = [{
          field: 'user_id',
          compare: 'in',
          values: uids,
        }]

        const results = await context.{{TypeName}}.getMany(args);
        const ordered = orderedFor(results, uids, 'userId', false);
				const ret = reconcileBatchOneToMany(us, ordered, 'userId');

        return ret.map(r => r.length > 0 ? r : null);
      }
    },
    // public-visibility view
    {
      requiredScopes: (sources, args, context, info) => {
        {{#if AUTH.view.public}}
        {{#each AUTH.view.public as |ROLE|}}
        return [
          '{{ROLE}}:{{typeName}}/view'{{#unless @last}},{{/unless}}
        ]
        {{/each}}
        {{else}}
        return [];
        {{/if}}
      },
      providedScopes: (sources, args, context, info) => {
        return sources.map(s => context.auth.scope)
      },
      callback: async (sources, args, context, info) => {
        var filtered = sources.filter(s => s !== null)
        var uids = filtered.map(s => s.userId);

        args.filters = [{
          field: 'user_id',
          compare: 'in',
          values: uids,
          bool: 'and'
        },{
          field: '{{#if TYPE.visibility.public}}{{TYPE.visibility.public}}{{else}}public{{/if}}',
          compare: '=',
          value: true,
          bool: 'and'
        }]

        const results = await context.{{TypeName}}.getMany(args);
        const ordered = orderedFor(results, uids, 'userId', false);
				const ret = reconcileBatchOneToMany(us, ordered, 'userId');
        return ret.map(r => r.length > 0 ? r : null);
      }
    },
    {{else}}
    // non-visibility view
    {
      requiredScopes: (sources, args, context, info) => {
        {{#if AUTH.view}}
        {{#each AUTH.view as |ROLE|}}
        return [
          '{{ROLE}}:{{typeName}}/view'{{#unless @last}},{{/unless}}
        ]
        {{/each}}
        {{else}}
        return [];
        {{/if}}
      },
      providedScopes: (sources, args, context, info) => {
        return sources.map(s => context.auth.scope)
      },
      callback: async (sources, args, context, info) => {
        var uids = sources.filter(s => s !== null).map(s => s.userId);

        args.filters = [{
          field: 'user_id',
          compare: 'in',
          values: uids,
        }]

        const results = await context.{{TypeName}}.getMany(args);
        const ordered = orderedFor(results, uids, 'userId', false);
				const ret = reconcileBatchOneToMany(us, ordered, 'userId');

        return ret.map(r => r.length > 0 ? r : null);
      }
    },
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
  });

  const ret = reconcileBatchOneToOne(sources, us, 'userId');
  // console.log("{{TypeName}}.User - batch resolver - users", ret)

  return ret;

});

