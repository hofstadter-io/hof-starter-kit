{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}

import { graphql } from 'react-apollo';

import DELETE from '../graphql/mutations/delete.graphql';


export default graphql(DELETE, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    {{typeName}}Delete: async (id, next) => {
      console.log("{{typeName}}Delete - args", id, next);
      let ret = await mutate({
        variables: { id }
      });
      console.log("{{typeName}}Delete - ret", ret);

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

