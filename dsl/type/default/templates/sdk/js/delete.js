{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}

import { graphql } from 'react-apollo';

import DELETE from '../graphql/mutations/delete.graphql';


export default graphql(DELETE, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    {{typeName}}Delete: async (id) => {
      await mutate({
        variables: { id }
      });
      if (history) {
        return history.push('{{TYPE.pages.list.route}}');
      }
      if (navigation) {
        return navigation.navigate('{{TypeName}}List');
      }
    }
  })
})

{{/with}}
{{/with}}
{{/with}}

