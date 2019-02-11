render() {
  console.log("{{TYPE.name}} - {{COMPONENT.name}} - default content - props", this.props)
  let { loading{{camelT TYPE.name}}s, {{camel TYPE.name}}s } = this.props;
  return (
    <div>
      <b>{{TYPE.name}} - {{COMPONENT.name}} component - default content </b>
      <pre>{ loading{{camelT TYPE.name}}s ? "loading" : JSON.stringify({{camel TYPE.name}}s, null, 2) }</pre>
    </div>
  )
}

