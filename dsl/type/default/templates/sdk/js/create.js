{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}

import { graphql } from 'react-apollo';

import CREATE from '../graphql/mutations/create.graphql';


export default graphql(CREATE, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    {{typeName}}Create: async (values) => {
      // want to get return and go to the actual item
      await mutate({
        variables: { input: values }
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

