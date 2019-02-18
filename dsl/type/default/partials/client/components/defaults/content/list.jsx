render() {
  console.log("{{TYPE.name}} - {{COMPONENT.name}} - default content - props", this.props)
  let { loading{{camelT TYPE.name}}s, {{camel TYPE.name}}s } = this.props;
  return (
    <div>
      <b> {{TYPE.name}} - {{COMPONENT.name}} component - default content </b>
      {
        loading{{camelT TYPE.name}}s ? "loading" :
          ( {{camel TYPE.name}}s && {{camel TYPE.name}}s.edges ? {{camel TYPE.name}}s.edges.map((elem) => {
          return <pre key={ elem.node.id }><Link to={ "{{MODULE.route}}/{{kebab TYPE.name}}/" + elem.node.id }> <b> : { elem.node.name ? elem.node.name : elem.node.id } : </b> </Link>{  JSON.stringify(elem.node, null, 2) }</pre>
          }) : "no {{camel TYPE.name}}s" )
      }
    </div>
  )
}

