obj.Mutation.{{typeName}}Create = async (sources, args, context, info) => {
  console.log("GOT HERE CREATE", args, context.auth)
  let resolver = authSwitch([
    {
      requiredScopes: [
        {{#each AUTH.create as |ROLE|}}
        '{{ROLE}}:{{typeName}}/create'{{#unless @last}},{{/unless}}
        {{/each}}
      ],
      providedScopes: (sources, args, context, info) => context.auth.scope,
      callback: async (sources, args, context, info) => {
        try {
          const err = new FieldError();

          var {{typeName}} = args.input;
          {{typeName}}.userId = context.user.id;

          // TODO validate...
          var requestData = null;
          var requestResult = null;

          {{#if TYPE.hooks.pre-create}}
          requestData = {
            'hook': '{{typeName}}.pre-create',
            args,
            {{typeName}}: {{typeName}},
            user: context.user
          }
          {{#with TYPE.hooks.pre-create as |HOOK|}}
          {{> server/hooks/func.js}}
          {{/with}}
          // TODO check for error / status return

          {{typeName}} = requestResult.{{typeName}}
          {{/if}}

          var ret = await context.{{TypeName}}.createFor({{typeName}})
          console.log("CREATE {{typeName}} - ret", ret);
          var id = ret[0];
          {{typeName}}.id = id;
          var {{typeName}}Ret = await context.{{TypeName}}.get({
            id
          })
          {{#each TYPE.relations as |RELATION|}}
          {{typeName}}Ret.{{camel RELATION.name}} = [];
          {{/each}}
          console.log("CREATE {{typeName}}Ret", {{typeName}}Ret);

          {{#if TYPE.hooks.post-create}}
          requestData = {
            'hook': '{{typeName}}.post-create',
            args,
            {{typeName}}: {{typeName}}Ret,
            user: context.user
          }

          {{#with TYPE.hooks.post-create as |HOOK|}}
          {{> server/hooks/func.js}}
          {{/with}}
          // TODO check for error / status return

          {{typeName}}Ret = requestResult.data.{{typeName}}
          {{/if}}

          pubsub.publish('{{typeName}}sNotification', {
            {{typeName}}sNotification: {
              mutation: 'CREATED',
              id: {{typeName}}Ret.id,
              node: {{typeName}}Ret
            }
          });

          {{#each TYPE.relations as |RELATION|}}
          {{#if (eq RELATION.relation "belongs-to-one")}}
          // belongs-to-one notification?
          {{/if}}
          {{/each}}

          return { {{typeName}}: {{typeName}}Ret, errors: null };
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
    }
  ], {
    validator: 'wildcard-i-love-trump'
  });

  try {
    let ret = await resolver(sources, args, context, info);
    return ret;
  } catch (e) {
    return {
      {{typeName}}: null,
      errors: [{
        field: "?",
        message: e.message || "?"
      }]
    };
  }
}
