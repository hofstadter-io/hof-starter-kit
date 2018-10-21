obj.Mutation.{{typeName}}Update = authSwitch([
  {{#if TYPE.owned}}
  // owner update
  {
    requiredScopes: (sources, args, context, info) => {
      let reqd = ['owner:{{typeName}}/update'];
      return reqd;
    },
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      console.log('updating {{typeName}}:', args);
      try {
        const e = new FieldError();
        var id = args.id;
        args.values.updatedAt = new Date();
        var {{typeName}} = args.values;
        var user_id = context.user.id;
        console.log('updating {{typeName}}:', args);

        // TODO validate...

        var ret = await context.{{TypeName}}.updateFor({ id, user_id }, {{typeName}});
        console.log("UPDATE ret", ret);

        if (ret) {
          var result = await context.{{TypeName}}.get({
            id
          })
          return { {{typeName}}: result, errors: null};
        } else {
          return {
            {{typeName}}: null,
            message: "failed",
            errors: [{
              field: "?",
              message: "unknown error"
            }]
          };
        }

      } catch (e) {
        return {
          {{typeName}}: null,
          errors: [{
            field: "?",
            message: e
          }]
        };
      }
    }
  },
  {{/if}}

  // non-owner update
  {
    requiredScopes: [
      {{#each AUTH.update as |ROLE|}}
      '{{ROLE}}:{{typeName}}/update'{{#unless @last}},{{/unless}}
      {{/each}}
    ],
    providedScopes: (sources, args, context, info) => context.auth.scope,
    callback: async (sources, args, context, info) => {
      console.log('updating {{typeName}}:', args);
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

