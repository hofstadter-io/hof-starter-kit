{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}

import { graphql } from 'react-apollo';

import UPDATE from '../graphql/mutations/update.graphql';


export default graphql(UPDATE, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    {{typeName}}Update: async (id, values, next) => {
      console.log("{{typeName}}Update - args", id, values, next);
      let ret = await mutate({
        variables: { id, values }
      });
      console.log("{{typeName}}Update - ret", ret);

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
