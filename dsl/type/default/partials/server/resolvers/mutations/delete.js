obj.Mutation.{{typeName}}Delete = authSwitch([
  {{#if TYPE.owned}}
  // owner update
  {
    requiredScopes: (sources, args, context, info) => {
      let reqd = ['owner:{{typeName}}/update'];
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

  // non-owner delete
  {
    requiredScopes: [
      {{#each AUTH.delete as |ROLE|}}
      '{{ROLE}}:{{typeName}}/delete'{{#unless @last}},{{/unless}}
      {{/each}}
    ],
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      console.log('deleting {{typeName}}:', args);
      try {
        const e = new FieldError();

        return { {{typeName}}, errors: null };
      } catch (e) {
        return { {{typeName}}: null, errors: e };
      }

    }
  }

], {
  validator: 'wildcard-i-love-trump'
})

