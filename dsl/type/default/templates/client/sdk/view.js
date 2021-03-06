{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}

import { graphql } from 'react-apollo';

import SOLO from '../graphql/queries/solo.graphql';

export default graphql(SOLO, {
  options: props => {
    console.log("{{TypeName}} - solo view query container PROPS", props)
    let id = 1;
    if (props.match) {
      console.log("{{TypeName}} - props.match", props.match)
      id = props.match.params.{{typeName}}Id || props.match.params.id;
    } else if (props.navigation) {
      console.log("{{TypeName}} - props.navigation", props.navigation)
      id = props.navigation.state.params.{{typeName}}Id || props.navigation.state.params.id;
    }

    console.log("{{TypeName}} - solo view query container ID", id)

    return {
      variables: { id }
    };
  },
  props({ data: { loading, error, {{typeName}}, subscribeToMore } }) {
    console.log("{{TypeName}} - solo view props container", loading, error, {{typeName}})
    if (error) throw new Error(error);

    if( {{typeName}} && {{typeName}}.{{typeName}} ) {
      {{typeName}}= {{typeName}}.{{typeName}};
    }
    console.log("SETTING PROPS", {{typeName}})
    return {
      loading{{TypeName}}: loading,
      {{typeName}},
      subscribeToMore{{TypeName}}: subscribeToMore
    };
  }
})

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
