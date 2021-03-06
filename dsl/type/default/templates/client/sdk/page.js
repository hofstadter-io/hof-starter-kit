{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}

import { graphql } from 'react-apollo';

import PAGE from '../graphql/queries/page.graphql';

import paginationConfig from '../../../../../../../config/pagination';
import { PLATFORM  } from '../../../../../../common/utils';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server' ? paginationConfig.web.itemsNumber : paginationConfig.mobile.itemsNumber;


export default graphql(PAGE, {

    options: props => {
      // console.log("{{TypeName}} PAGING PROPS", props);
      let localLimit = props.limit ? props.limit : limit;
      let vars = { limit: localLimit, after: 0 };
      {{#each TYPE.relations as |RELATION|}}
      {{#if (eq RELATION.relation "belongs-to-one")}}
      vars.{{camel RELATION.name}}Id = props.match.params.id;
      {{/if}}
      {{/each}}
      // console.log("{{TypeName}} PAGING PROPS - vars", vars);
      return {
        variables: vars,
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      // console.log("{{TypeName}} PAGING DATA", data)
      const { loading, error, {{typeName}}s, {{typeName}}Page, fetchMore, subscribeToMore } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const count = fetchMoreResult.{{typeName}}Page.count;
            const newEdges = fetchMoreResult.{{typeName}}Page.edges;
            const pageInfo = fetchMoreResult.{{typeName}}Page.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.{{typeName}}Page.edges, ...newEdges] : newEdges;

            let ret = {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              {{typeName}}s: {
                count,
                edges: displayedEdges,
                pageInfo,
                __typename: '{{TypeName}}s'
              }
            };

            ret.{{typeName}}s = ret.{{typeName}}Page

            // console.log("{{TypeName}} PAGING DATA - fetchMore - ret", ret)
            return ret;
          }
        });
      };

      if (error) throw new Error(error);
      // let ret = { loading, {{typeName}}s: {{typeName}}Page, {{typeName}}Page, subscribeToMore{{TypeName}}: subscribeToMore, loadData };
      let ret = {
        loading{{TypeName}}s: loading,
        {{typeName}}s: {{typeName}}Page ? {{typeName}}Page : null,
        subscribeToMore{{TypeName}}s: subscribeToMore,
        loadData
      };
      // if ({{typeName}}Page) {
      // ret.{{typeName}}s = {{typeName}}Page
      // }
      // console.log("{{TypeName}} PAGING DATA - ret", ret)
      return ret;
    }
  })

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}

