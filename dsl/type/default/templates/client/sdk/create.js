{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}

import { graphql } from 'react-apollo';

import CREATE from '../graphql/mutations/create.graphql';


export default graphql(CREATE, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    {{typeName}}Create: async (values, next) => {
      console.log("{{typeName}}Create - args", values, next);
      // want to get return and go to the actual item
      let ret = await mutate({
        variables: { input: values }
      });
      console.log("{{typeName}}Create - ret", ret);
      if (next) {
        if (next === "" || next === "nowhere" || next === "stay"){
          return
        }

        if (history) {
          return history.push(next);
        }
        if (navigation) {
          return navigation.navigate(next);
        }
      } else {
        if (history) {
          return history.push('{{TYPE.pages.list.route}}');
        }
        if (navigation) {
          return navigation.navigate('{{TypeName}}List');
        }
      }
    }
  })
})

{{/with}}
{{/with}}
{{/with}}

