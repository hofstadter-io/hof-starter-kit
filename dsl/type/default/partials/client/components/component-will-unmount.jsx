componentWillUnmount() {

{{#each PAGE.data as |DATA|}}
{{#if DATA.query}}
{{#if DATA.query.sync}}
{{#gettype DATA.type false}}
{{#with . as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}

  if (this.{{camel DATA.name}}Subscription) {
    this.{{camel DATA.name}}Subscription();
    this.{{camel DATA.name}}Subscription = null;
  }

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/gettype}}
{{/if}}
{{/if}}
{{/each}}

}

