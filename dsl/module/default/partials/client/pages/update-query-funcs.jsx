{{#each PAGE.data as |DATA|}}
{{#gettype DATA.type false}}
{{#with . as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}

{{#each DATA.mutations as |MUTATION|}}
{{#if (eq MUTATION "create")}}
// UPDATE QUERIES CREATE
{{else if (eq MUTATION "update")}}
// UPDATE QUERIES UPDATE
{{else if (eq MUTATION "delete")}}
// UPDATE QUERIES DELETE
const update{{camelT DATA.name}}Queries = {
  {{camel DATA.name}}: (
    prev,
    {
      mutationResult: {
        data: { {{typeName}}Delete }
      }
    }
  ) => {
    // console.log("update{{camelT DATA.name}}Queries")
    Delete{{camelT DATA.name}}(prev, {{typeName}}Delete.id)
  }
}
{{/if}}
{{/each}}

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/gettype}}
{{/each}}
