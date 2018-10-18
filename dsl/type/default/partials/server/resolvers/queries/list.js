obj.Query.{{typeName}}List = authSwitch([
  {{#if TYPE.owned}}
  // owner view
  {
    requiredScopes: (sources, args, context, info) => {
      if (args.options && args.options.visibility && args.options.visibility.self === true) {
        return ['owner:{{typeName}}/view'];
      }
      return ['skip']
    },
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      try {
        args.userId = context.user.id;
        {{#if TYPE.visibility.enabled}}
        if (args.options && args.options.visibility && args.options.visibility.which) {
          const which = args.options.visibility.which;
          if (which === '{{TYPE.visibility.public}}') {
            args.filters = [{
              field: '{{TYPE.visibility.public}}',
              compare: '=',
              value: true
            }]
          } else if (which === '{{TYPE.visibility.private}}') {
            args.filters = [{
              field: '{{TYPE.visibility.public}}',
              compare: '=',
              value: false
            }]
          }
        }
        {{/if}}
        const results = await context.{{TypeName}}.getManyFor(args);
        return { results: results, count: -1, total: -1, errors: null};
      } catch (e) {
        return { results: null, count: -1, total: -1, errors: [e]};
      }
    }
  },
  {{/if}}

  {{#if TYPE.visibility.enabled}}
  // private-visibility view
  {
    requiredScopes: (sources, args, context, info) => {
      console.log('Query.{{typeName}}List - non-owner - reqd', context.auth, context.user);
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
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      try {
        {{#if TYPE.visibility.enabled}}
        if (args.options && args.options.visibility && args.options.visibility.which) {
          const which = args.options.visibility.which;
          if (which === '{{TYPE.visibility.public}}') {
            args.filters = [{
              field: '{{TYPE.visibility.public}}',
              compare: '=',
              value: true
            }]
          } else if (which === '{{TYPE.visibility.private}}') {
            args.filters = [{
              field: '{{TYPE.visibility.public}}',
              compare: '=',
              value: false
            }]
          }
        }
        {{/if}}
        const results = await context.{{TypeName}}.getMany(args);
        return { results: results, count: -1, total: -1, errors: null};
      } catch (e) {
        return { results: null, count: -1, total: -1, errors: [e]};
      }
    }
  },

  // public-visibility view
  {
    requiredScopes: (sources, args, context, info) => {
      console.log('Query.{{typeName}}List - non-owner - reqd', context.auth, context.user);
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
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      try {
        args.filters = args.filters || [];
        args.filters.push({
          field: '{{TYPE.visibility.public}}',
          compare: '=',
          value: true
        })
        const results = await context.{{TypeName}}.getMany(args);
        return { results: results, count: -1, total: -1, errors: null};
      } catch (e) {
        return { results: null, count: -1, total: -1, errors: [e]};
      }
    }
  },
  {{else}}
  // non-visibility view
  {
    requiredScopes: (sources, args, context, info) => {
      console.log('Query.{{typeName}}List - non-owner - reqd', context.auth, context.user);
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
      try {
        const results = await context.{{TypeName}}.getMany(args);
        return { results: results, count: -1, total: -1, errors: null};
      } catch (e) {
        return { results: null, count: -1, total: -1, errors: [e]};
      }
    }
  },
  {{/if}}

], {
  validator: 'wildcard-i-love-trump'
});


