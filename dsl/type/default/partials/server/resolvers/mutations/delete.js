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
        } else {
          // why did we fail?
          if ({{typeName}}) {
            message = "unknown"
          } else {
            message = "not found"
          }
        }
        return { {{typeName}}: null, message,  errors: null};
      } catch (e) {
        return { {{typeName}}: null, message: null, errors: e };
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
      try {
        // Need to validate incoming filters...
        args.filters = args.filters || [];
        args.userId = context.user.id;

        var message = "failed"
        const result = await context.{{TypeName}}.deleteFor({
          id: args.id,
          userId: args.userId
        });

        if (result) {
          message = "success"
        } else {
          // why did we fail?
          const ret = await context.{{TypeName}}.getFor(args);
          if (ret) {
            message = "unknown"
          } else {
            message = "not found"
          }
        }
        return { {{typeName}}: null, message,  errors: null};
      } catch (e) {
        return { {{typeName}}: null, message: null, errors: e };
      }
    }
  }
  {{/if}}

], {
  validator: 'wildcard-i-love-trump'
})

