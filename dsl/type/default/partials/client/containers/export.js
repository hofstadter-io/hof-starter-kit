export default compose(
  withLoadedUser,

{{#each VIEW.relations as |RELATION|}}
{{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |SDK_TYPE|}}
  {{RELATION.name}}SDK.ViewClient,
  {{RELATION.name}}SDK.CreateClient,
  {{RELATION.name}}SDK.Page,
  {{RELATION.name}}SDK.Create,
  {{RELATION.name}}SDK.Update,
  {{RELATION.name}}SDK.Delete,
{{/with}}{{/gettype}}{{/if}}
{{/each}}

{{#unless VIEW.omit-sdk}}
  {{TypeName}}SDK.View,
  {{TypeName}}SDK.Delete
{{/unless}}

)({{TypeName}}View);

