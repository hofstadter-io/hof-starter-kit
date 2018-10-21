{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}

import { graphql } from 'react-apollo';

import UPDATE from '../graphql/mutations/update.graphql';


export default graphql(UPDATE, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    {{typeName}}Update: async (id, values) => {
      console.log("UPDATE", id, values)
      await mutate({
        variables: { id, values }
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
