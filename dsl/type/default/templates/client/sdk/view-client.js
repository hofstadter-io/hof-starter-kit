{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}

import { graphql } from 'react-apollo';

import SOLO from '../graphql/queries/solo-client.graphql';

export default graphql(SOLO, {
  props: ({ data: { {{typeName}}  }  }) => ({ {{typeName}}  })
})

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
