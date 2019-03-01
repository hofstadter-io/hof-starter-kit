loadingRender = () => {
  return (
    <i>loading</i>
  )
}

listRender = ({{camel TYPE.name}}s) => {
  if ( {{camel TYPE.name}}s && {{camel TYPE.name}}s.edges ) {
    return (
      <div>
        {
          {{camel TYPE.name}}s.edges.map((elem) => {
            return this.itemRender(elem);
          })
        }
      </div>
    )
  }

}

itemRender = (elem) => {
  return (
    <div className="card" style={ { width: "100%" } } key={ elem.node.id }>
      <div className="card-body">
        <h3 className="card-title">{ elem.node.name ? elem.node.name : elem.node.id }</h3>
        <Link className="btn btn-primary" to={ "{{MODULE.route}}/{{kebab TYPE.name}}/edit/" + elem.node.id }>
          settings
        </Link>
      </div>
    </div>
  )
}

render() {
  console.log("{{TYPE.name}} - {{COMPONENT.name}} - default content - props", this.props)
  let { loading{{camelT TYPE.name}}s, {{camel TYPE.name}}s } = this.props;
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-8 col-sm-11">

          <b> {{TYPE.name}} - {{COMPONENT.name}} component - default content </b>
          {
            loading{{camelT TYPE.name}}s ? this.loadingRender() : this.listRender({{camel TYPE.name}}s)
          }

        </div>
      </div>
    </div>
  )
}

