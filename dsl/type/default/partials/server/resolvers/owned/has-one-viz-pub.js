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
    const ret = reconcileBatchOneToOne(us, ordered, 'userId');
    return ret.map(r => r.length > 0 ? r : null);
  }
},
