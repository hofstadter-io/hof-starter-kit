{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}

import { graphql } from 'react-apollo';

import CREATE from '../graphql/mutations/create.graphql';


export default graphql(CREATE, {
  props: ({ ownProps, mutate }) => ({
    // TODO pull apart values based on relationships
    {{typeName}}Create: async (values) => {
      // console.log("{{typeName}}Create - args", values);
      // want to get return and go to the actual item
      let ret = await mutate({
        variables: { input: values },
        optimisticResponse: {
          __typename: 'Mutation',
          {{typeName}}Create: {
            __typename: '{{TypeName}}MutationPayload',
            // TODO pull apart and construct nased on relationships
            {{typeName}}: values,
            message: null,
            errors: null
          }
        }
      });

      // console.log("{{typeName}}Create - ret", ret);
    }
  })
})

{{/with}}
{{/with}}
{{/with}}

