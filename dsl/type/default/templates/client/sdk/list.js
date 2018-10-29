{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}

import { graphql } from 'react-apollo';

import LIST from '../graphql/queries/list.graphql';

export default graphql(LIST, {
  options: props => {
    var offset = 0
    var limit = 10

    // console.log("{{TypeName}} - list query container", offset, limit)

    return {
      options: { offset, limit }
    };
  },
  props(results) {
    // console.log("{{TypeName}} - list props container - results", results)
    let { data } = results;
    // console.log("{{TypeName}} - list props container - data", data)
    let { loading, error, {{typeName}}List /*, subscribeToMore*/ } = data;
    let {{typeName}}s = {{typeName}}List ? {{typeName}}List.results : [];
    // console.log("{{TypeName}} - list props container - props", loading, error, {{typeName}}s)
    if (error) throw new Error(error);
    return { loading, {{typeName}}s /*, subscribeToMore */};
  }
})

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}

