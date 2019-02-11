render() {
  console.log("{{TYPE.name}} - {{COMPONENT.name}} - default content - props", this.props)
  let { loading{{camelT TYPE.name}}, {{camel TYPE.name}} } = this.props;
  return (
    <div>
      <b>{{TYPE.name}} - {{COMPONENT.name}} component - default content </b>
      <pre>{ loading{{camelT TYPE.name}} ? "loading" : JSON.stringify({{camel TYPE.name}}, null, 2) }</pre>
    </div>
  )
}

