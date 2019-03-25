obj.Mutation.{{typeName}}Update = authSwitch([
  {{#if TYPE.owned}}
  {{#unless TYPE.owned.no-mutate}}
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
        var {{ternary (camel TYPE.owned.name) "user"}}_id = context.user.id;
        console.log('updating {{typeName}}:', args);

        var {{typeName}}Ret = await context.{{TypeName}}.get({id: args.id});

        {{#if TYPE.hooks.pre-update}}
        requestData = {
          hook: '{{typeName}}.pre-update',
          args,
          {{typeName}}: {{typeName}}Ret,
          user: context.user
        }
        {{#with TYPE.hooks.pre-update as |HOOK|}}
        {{> server/hooks/func.js UNIQ="PreUpdate"}}
        {{/with}}
        // TODO check for error / status return

        {{typeName}} = requestResult.data && requestResult.data.{{typeName}} ?
          requestResult.data.{{typeName}} :
          {{typeName}}
        {{/if}}

        var ret = await context.{{TypeName}}.updateFor({ id, {{ternary (camel TYPE.owned.name) "user"}}_id }, {{typeName}});
        console.log("UPDATE ret", ret);

        if (ret) {
          {{typeName}}Ret = await context.{{TypeName}}.get({
            id
          })
          console.log("UPDATE {{typeName}}Ret", {{typeName}}Ret);

          {{#if TYPE.hooks.post-update}}
          requestData = {
            hook: '{{typeName}}.post-update',
            args,
            {{typeName}}: {{typeName}}Ret,
            user: context.user
          }

          {{#with TYPE.hooks.post-update as |HOOK|}}
          {{> server/hooks/func.js UNIQ="PostUpdate"}}
          {{/with}}
          // TODO check for error / status return

          {{typeName}}Ret = requestResult.data && requestResult.data.{{typeName}} ?
            requestResult.data.{{typeName}} :
            {{typeName}};

          {{/if}}

          // list view
          pubsub.publish('{{typeName}}sNotification', {
            {{typeName}}sNotification: {
              mutation: 'UPDATED',
              id: {{typeName}}Ret.id,
              node: {{typeName}}Ret
            }
          });
          // solo view
          pubsub.publish('{{typeName}}Notification', {
            {{typeName}}Notification: {
              mutation: 'UPDATED',
              id: {{typeName}}Ret.id,
              node: {{typeName}}Ret
            }
          });
          return { {{typeName}}Ret, errors: null};
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
  {{/unless}}
  {{/if}}

  {{#if AUTH.update}}
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
  },
  {{/if}}

], {
  validator: 'wildcard-i-love-trump'
})

