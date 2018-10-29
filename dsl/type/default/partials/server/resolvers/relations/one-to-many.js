// one-to-many Batch Resolver

obj.{{TypeName}} = obj.{{TypeName}} || {};
obj.{{TypeName}}.{{camel RELATION.name}} = createBatchResolver(async (sources, args, context, info) => {
  // TODO auth batching

  console.log("{{TypeName}}.{{camel RELATION.name}} - entry", sources, args)

  const blocks = [
    // Owner Block
    /*
    {
      requiredScopes: (sources, args, context, info) => {
        return ['owner:{{relName}}/view']
      },
      providedScopes: (sources, args, context, info) => {
        return sources.map(s => {
          return s.userId == context.user.id ? context.auth.scope : []
        })
      },
      callback: async (sources, args, context, info) => {
        args.userId = context.user.id;
        const results = await context.{{RelName}}.getManyFor(args);
        const ordered = orderedFor(results, [context.user.id], 'userId', false);
				const ret = reconcileBatchOneToMany(us, ordered, 'userId');

        return ret.map(r => r.length > 0 ? r : null);
      }
    },
    */

    // Non-owner Blocks
    {{#if REL_TYPE.visibility.enabled}}
    // private-visibility view
    {
      requiredScopes: (sources, args, context, info) => {
        {{#if REL_AUTH.view.private}}
        {{#each REL_AUTH.view.private as |ROLE|}}
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
        {{#if REL_AUTH.view.public}}
        {{#each REL_AUTH.view.public as |ROLE|}}
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
          field: '{{#if REL_TYPE.visibility.public}}{{REL_TYPE.visibility.public}}{{else}}public{{/if}}',
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
        console.log("{{TypeName}}.{{camel RELATION.name}} - non-viz - reqd", sources)
        {{#if REL_AUTH.view}}
        {{#each REL_AUTH.view as |ROLE|}}
        return [
          '{{ROLE}}:{{relName}}/view'{{#unless @last}},{{/unless}}
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
        var ids = sources.filter(s => s !== null).map(s => s.{{typeName}}Id);

        args.filters = [{
          field: '{{snake typeName}}_id',
          compare: 'in',
          values: ids,
        }]
        console.log("{{TypeName}}.{{camel RELATION.name}} - non-viz - ids", ids)

        const results = await context.{{RelName}}.getMany(args);
        console.log("{{TypeName}}.{{camel RELATION.name}} - non-viz - results", results)
        const ordered = orderedFor(results, ids, '{{typeName}}Id', false);
        console.log("{{TypeName}}.{{camel RELATION.name}} - non-viz - ordered", ordered)
				const ret = reconcileBatchOneToMany(sources, ordered, '{{typeName}}Id');
        console.log("{{TypeName}}.{{camel RELATION.name}} - non-viz - ret", ret)

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
  const srcs = sources.map(s => {
    s.{{typeName}}Id = s.id;
    return s;
  });

  // Make the actual call
  const results = await authResolver(srcs, args, context, info)
  console.log("{{TypeName}}.{{camel RELATION.name}} - final", results)

  // Return empty when not an array (likely an Authzn Error)
  const ret = results.map((r,idx) => Array.isArray(r) ? r : [])
  console.log("{{TypeName}}.{{camel RELATION.name}} - final", ret)
  return ret;
});

