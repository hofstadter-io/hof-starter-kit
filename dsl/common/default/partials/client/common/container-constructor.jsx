constructor(props) {
  super(props);

{{#each THING.data as |DATA|}}
{{#if DATA.query}}
{{#if DATA.query.sync}}
{{#gettype DATA.type false}}
{{#with . as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}

{{#if (eq DATA.query.type "view")}}
  this.{{camel DATA.name}}Subscription = null;
{{else if (eq DATA.query.type "list")}}
  this.{{camel DATA.name}}Subscription = null;
{{/if}}

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/gettype}}
{{/if}}
{{/if}}
{{/each}}

}


