onSubmit = ({{camel TYPE.name}}) => values => {
  let formMode = this.props.formMode;
  if (formMode === "create") {
    this.props.{{camel TYPE.name}}Create(values);
  } else if (formMode === "update") {
    this.props.{{camel TYPE.name}}Update({{camel TYPE.name}}.id, values);
  } else {
    console.error("Unknown formMode", formMode);
  }
}

render() {
  console.log("{{TYPE.name}} - {{COMPONENT.name}} - default content - props", this.props)
  let { loading{{camelT TYPE.name}}, {{camel TYPE.name}} } = this.props;

  return (
    <div>
      <b>{{TYPE.name}} - {{COMPONENT.name}} component - default content </b>
			<DefaultForm onSubmit={ this.onSubmit({{camel TYPE.name}}) } {...this.props} />
      <pre>{ loading{{camelT TYPE.name}} ? "loading" : JSON.stringify({{camel TYPE.name}}, null, 2) }</pre>
    </div>
  )
}

