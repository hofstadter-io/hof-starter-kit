obj.Query.{{typeName}} = authSwitch([

  {{#if TYPE.owned}}
  // owner view
  {
    requiredScopes: async (sources, args, context, info) => {
      args.id = args.{{typeName}}Id
      const results = await context.{{TypeName}}.get(args);
      if (results && results.userId === context.user.id) {
        return ['owner:{{typeName}}/view'];
      } else {
        return ['skip']
      }
    },
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      // Need to validate incoming filters...
      args.id = args.{{typeName}}Id
      args.filters = args.filters || [];
      args.userId = context.user.id;
      console.log("{{typeName}} - owner args", args)
      const results = await context.{{TypeName}}.getFor(args);
      console.log("{{typeName}} - owner results", results)
      return { {{typeName}}: results, errors: null};
    }
  },
  {{/if}}


  {{#if TYPE.visibility.enabled}}
  // non-owner public view
  {
    requiredScopes: async (sources, args, context, info) => {
      let reqd = [
        {{#each AUTH.view.public as |ROLE|}}
        '{{ROLE}}:{{typeName}}/view'{{#unless @last}},{{/unless}}
        {{/each}}
      ]
      console.log("{{typeName}} - non-owner public reqd scopes", reqd);
      return reqd;
    },
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      console.log("{{typeName}} - non-owner public callback", args)
      // Need to validate incoming filters...
      args.id = args.{{typeName}}Id
      args.filters = args.filters || [];
      args.filters.push({
        field: '{{#if TYPE.visibility.public}}{{snake TYPE.visibility.public}}{{else}}is_public{{/if}}',
        compare: '=',
        value: true
      })
      console.log("{{typeName}} - non-owner public args", args)
      const results = await context.{{TypeName}}.get(args);
      return { {{typeName}}: results, errors: null};
    }
  },

  // non-owner private view
  {
    requiredScopes: async (sources, args, context, info) => {
      let reqd = [
        {{#each AUTH.view.private as |ROLE|}}
        '{{ROLE}}:{{typeName}}/view'{{#unless @last}},{{/unless}}
        {{/each}}
      ]
      console.log("{{typeName}} - non-owner private reqd scopes", reqd);
      return reqd;
    },
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      console.log("{{typeName}} - non-owner private callback", args)
      // Need to validate incoming filters...
      args.id = args.{{typeName}}Id
      args.filters = args.filters || [];
      console.log("{{typeName}} - non-owner private args", args)
      const results = await context.{{TypeName}}.get(args);
      return { {{typeName}}: results, errors: null};
    }
  },

  {{else}}
  // non-owner view
  {
    requiredScopes: async (sources, args, context, info) => {
      {{#if AUTH.view}}
      let reqd = [
      {{#each AUTH.view as |ROLE|}}
        '{{ROLE}}:{{typeName}}/view'{{#unless @last}},{{/unless}}
      {{/each}}
      ]
      {{else}}
      let reqd = [];
      {{/if}}
      console.log("{{typeName}} - non-owner reqd scopes", reqd);
      return reqd;
    },
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      console.log("{{typeName}} - non-owner callback", args)
      // Need to validate incoming filters...
      args.id = args.{{typeName}}Id
      args.filters = args.filters || [];
      {{#if TYPE.visibility.enabled}}
      args.filters.push({
        field: '{{#if TYPE.visibility.public}}{{snake TYPE.visibility.public}}{{else}}is_public{{/if}}',
        compare: '=',
        value: true
      })
      {{/if}}
      console.log("{{typeName}} - non-owner args", args)
      const results = await context.{{TypeName}}.get(args);
      return { {{typeName}}: results, errors: null};
    }
  },
  {{/if}}

], {
  validator: 'wildcard-i-love-trump'
});
