{{#each TYPES as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}

{{> PARTIAL}}

{{/with}}
{{/with}}
{{/with}}
{{/each}}
