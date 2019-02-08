render() {
  return (
    <{{PageName}}Page
      {...this.props}

      {{#each PAGE.data as |DATA|}}
      {{#each DATA.mutations as |MUTATION|}}
      {{#if (eq MUTATION "create")}}
      create{{camelT DATA.name}}={ this.create{{camelT DATA.name}} }
      {{else if (eq MUTATION "update")}}
      update{{camelT DATA.name}}={ this.update{{camelT DATA.name}} }
      {{else if (eq MUTATION "delete")}}
      delete{{camelT DATA.name}}={ this.delete{{camelT DATA.name}} }
      {{/if}}
      {{/each}}
      {{/each}}
    />
  )
}

