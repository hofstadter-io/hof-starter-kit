onSubmit = ({{camel TYPE.name}}, {{camel TYPE.name}}Update) => values => {
  {{camel TYPE.name}}Update({{camel TYPE.name}}.id, values);
};

render() {
  console.log("{{TYPE.name}} - {{COMPONENT.name}} - default content - props", this.props)
  let { loading{{camelT TYPE.name}}, {{camel TYPE.name}}, {{camel TYPE.name}}Update } = this.props;
  return (
    <div>
      <b>{{TYPE.name}} - {{COMPONENT.name}} component - default content </b>
			<DefaultForm onSubmit={this.onSubmit({{camel TYPE.name}}, {{camel TYPE.name}}Update)} {...this.props} />
      <pre>{ loading{{camelT TYPE.name}} ? "loading" : JSON.stringify({{camel TYPE.name}}, null, 2) }</pre>
    </div>
  )
}

