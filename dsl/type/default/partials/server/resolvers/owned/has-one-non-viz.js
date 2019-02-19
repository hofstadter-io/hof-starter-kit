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
    var uids = sources.filter(s => s !== null).map(s => s.{{ternary (camel TYPE.owned.name) "user"}}Id);

    args.filters = [{
      field: '{{ternary (snake TYPE.owned.name) "user"}}_id',
      compare: 'in',
      values: uids,
    }]

    const results = await context.{{TypeName}}.getMany(args);
    const ordered = orderedFor(results, uids, '{{ternary (camel TYPE.owned.name) "user"}}Id', false);
    const ret = reconcileBatchOneToOne(us, ordered, '{{ternary (camel TYPE.owned.name) "user"}}Id');

    return ret.map(r => r.length > 0 ? r : null);
  }
},
