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

          // TODO validate...

          var ret = await context.{{TypeName}}.createFor(context.user.id, {{typeName}})
          var pid = ret[0];
          {{typeName}}.id = pid;

          return { {{typeName}}, errors: null };
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
