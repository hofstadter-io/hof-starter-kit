componentDidMount() {

{{#each PAGE.data as |DATA|}}
{{#if DATA.query}}
{{#if DATA.query.sync}}

  if (!this.props.loading{{camelT DATA.name}}) {
    this.init{{camelT DATA.name}}Subscription();
  }

{{/if}}
{{/if}}
{{/each}}

}
