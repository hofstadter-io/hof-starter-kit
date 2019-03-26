obj.Mutation.{{typeName}}Delete = authSwitch([

  // non-owner delete
  {
    requiredScopes: [
      {{#each AUTH.delete as |ROLE|}}
      '{{ROLE}}:{{typeName}}/delete'{{#unless @last}},{{/unless}}
      {{/each}}
    ],
    providedScopes: (sources, args, context, info) => context.auth.scope || [],
    callback: async (sources, args, context, info) => {
      console.log("DELETEEEEEEEEEEEEEEEEEEEE")
      try {
        // Need to validate incoming filters...
        args.filters = args.filters || [];
        args.{{ternary (camel TYPE.owned.name) "user"}}_id = context.user.id;

        var {{typeName}} = await context.{{TypeName}}.get({id: args.id});
        var requestData = null;
        var requestResult = null;

        {{#if TYPE.hooks.pre-delete}}
        requestData = {
          hook: '{{typeName}}.pre-delete',
          args,
          {{typeName}}: {{typeName}},
          user: context.user
        }
        {{#with TYPE.hooks.pre-delete as |HOOK|}}
        {{> server/hooks/func.js UNIQ="PreDelete"}}
        {{/with}}
        // TODO check for error / status return
        if (requestResult.error) {
          return { {{typeName}}: null, message: null, errors: [requestResult.error] };
        }

        {{typeName}} = requestResult.data && requestResult.data.{{typeName}} ?
          requestResult.data.{{typeName}} :
          {{typeName}}
        {{/if}}

        const result = await context.{{TypeName}}.delete(args.id);

        var message = "failed"
        if (result) {
          message = "success"

          {{#if TYPE.hooks.post-delete}}
          requestData = {
            hook: '{{typeName}}.post-delete',
            args,
            {{typeName}}: {{typeName}},
            user: context.user
          }

          {{#with TYPE.hooks.post-delete as |HOOK|}}
          {{> server/hooks/func.js UNIQ="PostDelete"}}
          {{/with}}
          // TODO check for error / status return
          if (requestResult.error) {
            return { {{typeName}}: null, message: null, errors: [requestResult.error] };
          }

          {{typeName}} = requestResult.data && requestResult.data.{{typeName}} ?
            requestResult.data.{{typeName}} :
            {{typeName}};

          {{/if}}

          // list view
          pubsub.publish('{{typeName}}sNotification', {
            {{typeName}}sNotification: {
              mutation: 'DELETED',
              id: {{typeName}}.id,
              node: {{typeName}}
            }
          });
          // solo view
          pubsub.publish('{{typeName}}Notification', {
            {{typeName}}Notification: {
              mutation: 'DELETED',
              id: {{typeName}}.id,
              node: {{typeName}}
            }
          });
          console.log("HOT HERE")
        } else {
          // why did we fail?
          if ({{typeName}}) {
            message = "unknown"
          } else {
            message = "not found"
          }
        }
        let ret = { {{typeName}}: {{typeName}}, message,  errors: null};
        console.log("not-owner:{{typeName}}/delete - ret", ret)

        return ret;
      } catch (e) {
        return { {{typeName}}: {{typeName}}, message: null, errors: e };
      }

    }
  },

  {{#if TYPE.owned}}
  {{#unless TYPE.owned.no-mutate}}
  // owner update
  {
    requiredScopes: (sources, args, context, info) => {
      let reqd = ['owner:{{typeName}}/delete'];
      return reqd;
    },
    providedScopes: (sources, args, context, info) => context.auth.scope || [],
    callback: async (sources, args, context, info) => {
      console.log("DELETEEEEEEEEEEEEEEEEEEEE by owner")
      try {
        // Need to validate incoming filters...
        args.filters = args.filters || [];
        args.userId = context.user.id;
        args.{{ternary (camel TYPE.owned.name) "user"}}_id = context.user.id;

        console.log("ARRRRGS!!!", args)

        var result = null;
        var requestData = null;
        var requestResult = null;

        var {{typeName}} = await context.{{TypeName}}.getFor(args);
        console.log("{{typeName}} DB", {{typeName}})
        if ({{typeName}}.userId === args.userId) {

          {{#if TYPE.hooks.pre-delete}}
          requestData = {
            hook: '{{typeName}}.pre-delete',
            args,
            {{typeName}}: {{typeName}},
            user: context.user
          }
          {{#with TYPE.hooks.pre-delete as |HOOK|}}
          {{> server/hooks/func.js UNIQ="PreDelete"}}
          {{/with}}
          // TODO check for error / status return
          if (requestResult.error) {
            return { {{typeName}}: null, message: null, errors: [requestResult.error] };
          }

          {{typeName}} = requestResult.data && requestResult.data.{{typeName}} ?
            requestResult.data.{{typeName}} :
            {{typeName}}
          {{/if}}

          result = await context.{{TypeName}}.delete({{typeName}}.id);
        }
        console.log("result DB", result)

        var message = "failed"
        if (result) {
          message = "success"

          {{#if TYPE.hooks.post-delete}}
          var requestData = {
            hook: '{{typeName}}.post-delete',
            args,
            {{typeName}}: {{typeName}},
            user: context.user
          }

          {{#with TYPE.hooks.post-delete as |HOOK|}}
          {{> server/hooks/func.js UNIQ="PostDelete"}}
          {{/with}}
          // TODO check for error / status return
          if (requestResult.error) {
            return { {{typeName}}: null, message: null, errors: [requestResult.error] };
          }

          {{typeName}} = requestResult.data && requestResult.data.{{typeName}} ?
            requestResult.data.{{typeName}} :
            {{typeName}};

          {{/if}}

          // list view
          pubsub.publish('{{typeName}}sNotification', {
            {{typeName}}sNotification: {
              mutation: 'DELETED',
              id: {{typeName}}.id,
              node: {{typeName}}
            }
          });
          // solo view
          pubsub.publish('{{typeName}}Notification', {
            {{typeName}}Notification: {
              mutation: 'DELETED',
              id: {{typeName}}.id,
              node: {{typeName}}
            }
          });
        } else {
          // why did we fail?
          if ({{typeName}}) {
            message = "unknown"
          } else {
            message = "not found"
          }
        }
        let ret = { {{typeName}}: {{typeName}}, message,  errors: null};
        console.log("owner:{{typeName}}/delete - ret", ret)
        return ret;
      } catch (e) {
        return { {{typeName}}: null, message: null, errors: e };
      }
    }
  }
  {{/unless}}
  {{/if}}

], {
  validator: 'wildcard-i-love-trump'
})

