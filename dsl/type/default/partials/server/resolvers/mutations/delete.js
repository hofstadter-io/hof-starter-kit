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
        const {{typeName}} = await context.{{TypeName}}.get({id: args.id});
        const result = await context.{{TypeName}}.delete(args.id);

        var message = "failed"
        if (result) {
          message = "success"
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

        console.log("ARRRRGS!!!", args)

        const {{typeName}} = await context.{{TypeName}}.getFor(args);
        console.log("{{typeName}} DB", {{typeName}})
        var result = null;
        if ({{typeName}}.userId === args.userId) {
          result = await context.{{TypeName}}.delete(args.id);
        }
        console.log("result DB", result)

        var message = "failed"
        if (result) {
          message = "success"
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
  {{/if}}

], {
  validator: 'wildcard-i-love-trump'
})

