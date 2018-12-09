{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}

import { graphql } from 'react-apollo';

import DELETE from '../graphql/mutations/delete.graphql';


export default updateQueries => {
  return graphql(DELETE, {
    props: ({ ownProps, mutate }) => ({
      {{typeName}}Delete: async (id) => {
        // console.log("{{typeName}}Delete - args", id);
        let ret = await mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            {{typeName}}Delete: {
              __typename: '{{TypeName}}MutationPayload',
              {{typeName}}: {
                __typename: '{{TypeName}}',
                id,
              },
              message: 'success',
              errors: null
            }
          },
          updateQueries,
        });
        // console.log("{{typeName}}Delete - ret", ret);

      }
    })
  })

}

{{/with}}
{{/with}}
{{/with}}

