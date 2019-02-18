{{#if THING.current-user}}
withLoadedUser,
{{/if}}

{{#each THING.data as |DATA|}}
{{#if DATA.query}}
{{#if (eq DATA.query.type "view")}}
{{camel DATA.name}}SDK.View,
  // {{camel DATA.name}}SDK.ViewClient,
{{else if (eq DATA.query.type "list")}}
{{camel DATA.name}}SDK.Page,
{{/if}}
{{/if}}
{{#each DATA.mutations as |MUTATION|}}
{{#if (eq MUTATION "create")}}
{{camel DATA.name}}SDK.Create,
{{camel DATA.name}}SDK.CreateClient,
{{else if (eq MUTATION "update")}}
{{camel DATA.name}}SDK.Update,
{{else if (eq MUTATION "delete")}}
{{camel DATA.name}}SDK.Delete(update{{camelT DATA.name}}Queries),
{{else}}
{{camel DATA.name}}SDK.{{camelT MUTATION}},
{{/if}}
{{/each}}

{{/each}}
