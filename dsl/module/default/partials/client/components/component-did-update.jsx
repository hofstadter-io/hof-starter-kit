componentDidUpdate(prevProps) {
  // console.log("{{PAGE.name}}.componentDidUpdate", prevProps)

{{#each PAGE.data as |DATA|}}
{{#if DATA.query}}
{{#if DATA.query.sync}}
{{#gettype DATA.type false}}
{{#with . as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}

{{#if (eq DATA.query.type "view")}}
  if (!this.props.loading{{camelT DATA.name}}) {
    let prev{{camelT DATA.name}}Id = prevProps.{{camel DATA.name}} ? prevProps.{{camel DATA.name}}.id : null;
    // Check if props have changed and, if necessary, restart the subscription
    if (this.{{camel DATA.name}}Subscription && prev{{camelT DATA.name}}Id !== this.props.{{camel DATA.name}}.id) {
      this.{{camel DATA.name}}Subscription();
      this.{{camel DATA.name}}Subscription = null;
    }

    this.init{{camelT DATA.name}}Subscription();
  }
{{else if (eq DATA.query.type "list")}}
  if (!this.props.loading{{camelT DATA.name}}) {
    const endCursor = this.props.{{camel DATA.name}} ? this.props.{{camel DATA.name}}.pageInfo.endCursor : 0;
    const prevEndCursor = prevProps.{{camel DATA.name}} ? prevProps.{{camel DATA.name}}.pageInfo.endCursor : null;
    // Check if props have changed and, if necessary, restart the subscription
    if (this.{{camel DATA.name}}Subscription && prevEndCursor !== endCursor) {
      this.{{camel DATA.name}}Subscription();
      this.{{camel DATA.name}}Subscription = null;
    }

    this.init{{camelT DATA.name}}Subscription();
  }
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



