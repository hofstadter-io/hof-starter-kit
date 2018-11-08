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
    const ret = reconcileBatchOneToOne(us, ordered, 'userId');

    return ret.map(r => r.length > 0 ? r : null);
  }
},
