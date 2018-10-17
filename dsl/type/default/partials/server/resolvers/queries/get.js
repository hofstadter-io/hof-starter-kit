obj.Query.{{typeName}} = authSwitch([
  {{#if TYPE.owned}}
  // owner view
  {
    requiredScopes: (sources, args, context, info) => {
      let reqd = ['owner:{{typeName}}/view'];
      return reqd;
    },
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      // Need to validate incoming filters...
      args.filters = args.filters || [];
      args.userId = context.user.id;
      const results = await context.{{TypeName}}.getFor(args);
      return { {{typeName}}: results, errors: null};
    }
  },
  {{/if}}

  // non-owner view
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
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      // Need to validate incoming filters...
      {{#if TYPE.visibility.enabled}}
      args.filters = args.filters || [];
      args.filters.push({
        field: 'is_public',
        compare: '=',
        value: true
      })
      {{/if}}
      const results = await context.{{TypeName}}.get(args);
      return { {{typeName}}: results, errors: null};
    }
  },
], {
  validator: 'wildcard-i-love-trump'
});
