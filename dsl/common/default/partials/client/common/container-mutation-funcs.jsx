{{#each THING.data as |DATA|}}
{{#gettype DATA.type false}}
{{#with . as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}

{{#each DATA.mutations as |MUTATION|}}
{{#if (eq MUTATION "create")}}
// OVERRIDE CREATE
create{{camelT DATA.name}} = (values, next) => {
  // console.log("OR CREATE {{DATA.name}}", values, next)

  this.props.{{typeName}}Create(values, next)
  this.props.{{typeName}}CreateClient(values)

}
{{else if (eq MUTATION "update")}}
// OVERRIDE UPDATE
update{{camelT DATA.name}} = (id, values, next) => {
  // console.log("OR UPDATE {{DATA.name}}", id, values, next)

  this.props.{{typeName}}Update(id, values, next)
}
{{else if (eq MUTATION "delete")}}
// OVERRIDE DELETE
delete{{camelT DATA.name}} = (id, next) => {
  // console.log("OR DELETE {{DATA.name}}", id, next)

  this.props.{{typeName}}Delete(id, next)
}
{{/if}}
{{/each}}

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/gettype}}
{{/each}}
