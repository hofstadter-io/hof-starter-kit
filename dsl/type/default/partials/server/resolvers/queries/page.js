obj.Query.{{typeName}}Page = authSwitch([
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
        const results = await context.{{TypeName}}.pagingFor(args);
        const edgesArray = [];
        const total = results.count;
        const hasNextPage = total > args.after + args.limit;

        results.results.map(({{typeName}}, index) => {
          edgesArray.push({
            cursor: args.after + index,
            node: {{typeName}}
          });
        });
        const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

        const ret = {
          count: total,
          edges: edgesArray,
          pageInfo: {
            endCursor,
            hasNextPage
          },
          errors: null
        };

        console.log('Query.{{typeName}}Page - non-owner - ret', ret);
        return ret;
        return { results: results, count: -1, total: -1, errors: null};
      } catch (e) {
        console.error('Query.{{typeName}}Page - non-owner - ERROR', e);

        const ret = {
          count: -1,
          edges: null,
          pageInfo: null,
          errors: [e]
        };
        return ret;
      }
    }
  },
  {{/if}}

  {{#if TYPE.visibility.enabled}}
  // private-visibility view
  {
    requiredScopes: (sources, args, context, info) => {
      console.log('Query.{{typeName}}Page - non-owner - reqd', context.auth, context.user);
      {{#if AUTH.view.private}}
      return [
      {{#each AUTH.view.private as |ROLE|}}
        '{{ROLE}}:{{typeName}}/view'{{#unless @last}},{{/unless}}
      {{/each}}
      ]
      {{else}}
      return [];
      {{/if}}
    },
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      console.log('Query.{{typeName}}Page - non-owner - callback', sources, args);
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
        const results = await context.{{TypeName}}.paging(args);
        console.log('Query.{{typeName}}Page - non-owner - results', results);


        const edgesArray = [];
        const total = results.count;
        const hasNextPage = total > args.after + args.limit;

        results.results.map(({{typeName}}, index) => {
          edgesArray.push({
            cursor: args.after + index,
            node: {{typeName}}
          });
        });
        const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

        const ret = {
          count: total,
          edges: edgesArray,
          pageInfo: {
            endCursor,
            hasNextPage
          },
          errors: null
        };

        console.log('Query.{{typeName}}Page - non-owner - ret', ret);
        return ret;

        // return { results: results, count: -1, total: -1, errors: null};
      } catch (e) {
        return { edges: [], count: -1, pageInfo: null, errors: [e]};
      }
    }
  },

  // public-visibility view
  {
    requiredScopes: (sources, args, context, info) => {
      console.log('Query.{{typeName}}List - non-owner - reqd', context.auth, context.user);
      {{#if AUTH.view.public}}
      return [
      {{#each AUTH.view.public as |ROLE|}}
        '{{ROLE}}:{{typeName}}/view'{{#unless @last}},{{/unless}}
      {{/each}}
      ]
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
        const results = await context.{{TypeName}}.paging(args);
        const edgesArray = [];
        const total = results.count;
        const hasNextPage = total > args.after + args.limit;

        results.results.map(({{typeName}}, index) => {
          edgesArray.push({
            cursor: args.after + index,
            node: {{typeName}}
          });
        });
        const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

        const ret = {
          count: total,
          edges: edgesArray,
          pageInfo: {
            endCursor,
            hasNextPage
          },
          errors: null
        };

        console.log('Query.{{typeName}}Page - non-owner - ret', ret);
        return ret;
        return { results: results, count: -1, total: -1, errors: null};
      } catch (e) {
        console.error('Query.{{typeName}}Page - non-owner - ERROR', e);

        const ret = {
          count: -1,
          edges: null,
          pageInfo: null,
          errors: [e]
        };
        return ret;
      }
    }
  },
  {{else}}
  // non-visibility view
  {
    requiredScopes: (sources, args, context, info) => {
      console.log('Query.{{typeName}}Page - non-owner - reqd', args, context.auth, context.user);
      {{#if AUTH.view}}
      return [
      {{#each AUTH.view as |ROLE|}}
        '{{ROLE}}:{{typeName}}/view'{{#unless @last}},{{/unless}}
      {{/each}}
      ]
      {{else}}
      return [];
      {{/if}}
    },
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      try {
        /*
          {{{yaml TYPE.relations}}}
        */
        {{#each TYPE.relations as |RELATION|}}
        {{#if (eq RELATION.relation "belongs-to-one")}}
        if (args.{{camel RELATION.name}}Id) {
          args.filters = [{
            field: '{{snake RELATION.name}}_id',
            compare: '=',
            value: args.{{camel RELATION.name}}Id
          }]

        }
        {{/if}}
        {{/each}}

        console.log('Query.{{typeName}}Page - non-owner - args', args);

        const results = await context.{{TypeName}}.paging(args);

        console.log('Query.{{typeName}}Page - non-owner - results', results);

        const edgesArray = [];
        const total = results.count;
        const hasNextPage = total > args.after + args.limit;

        results.results.map(({{typeName}}, index) => {
          edgesArray.push({
            cursor: args.after + index,
            node: {{typeName}}
          });
        });
        const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

        const ret = {
          count: total,
          edges: edgesArray,
          pageInfo: {
            endCursor,
            hasNextPage
          },
          errors: null
        };
        console.log('Query.{{typeName}}Page - non-owner - ret', ret);
        return ret;
      } catch (e) {
        console.error('Query.{{typeName}}Page - non-owner - ERROR', e);

        const ret = {
          count: -1,
          edges: null,
          pageInfo: null,
          errors: [e]
        };
        return ret;
      }
    }
  },
  {{/if}}

], {
  validator: 'wildcard-i-love-trump'
});

