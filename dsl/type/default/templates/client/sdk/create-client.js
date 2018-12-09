{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}

import { graphql } from 'react-apollo';

import CREATE from '../graphql/mutations/create-client.graphql';

export default graphql(CREATE, {
	props: ({ mutate }) => ({
		{{typeName}}CreateClient: {{typeName}} => {
      // console.log("{{typeName}}CreateClient", {{typeName}})
			mutate({ variables: {  {{typeName}}  } });
		}
	})
})

{{/with}}
{{/with}}
{{/with}}

