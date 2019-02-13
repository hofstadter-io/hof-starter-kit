{{#if PROXY.context-data}}
{{#each PROXY.context-data as |DATA|}}
// {{DATA.name}}
{{#gettype DATA.type false}}{{#with . as |TYPE|}}
{{#if (hasprefix DATA.lookup-source "query.")}}
var {{camel DATA.name}}Input = {
  id: req.{{DATA.lookup-source}},
}
// console.log("{{camel DATA.name}}Input", {{camel DATA.name}}Input)
{{else}}
  ><>< unknown DATA.lookup-source '{{DATA.lookup-source}}'
{{/if}}
var {{camel DATA.name}}Value = await req.context.{{camelT TYPE.name}}.lookupBy{{camelT DATA.lookup-query}}({{camel DATA.name}}Input);

context.{{camel DATA.name}} = {{camel DATA.name}}Value;
{{/with}}{{/gettype}}
{{/each}}
{{/if}}
