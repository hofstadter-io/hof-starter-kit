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
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-8 col-sm-11">
          <b>{{TYPE.name}} - {{COMPONENT.name}} component - default content </b>
          <DefaultForm onSubmit={ this.onSubmit({{camel TYPE.name}}) } {...this.props} />
        </div>
      </div>
    </div>
  )
}

