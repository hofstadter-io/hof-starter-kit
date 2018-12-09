{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
import {{upper type_name}}_QUERY_CLIENT from '../graphql/queries/solo-client.graphql';

const TYPE_NAME = '{{TypeName}}State';
const TYPE_NAME_{{upper type_name}} = '{{TypeName}}';

const defaults = {
  {{typeName}}: {
    id: null,
    /*
    createdAt: null,
    updatedAt: null,
    {{> client/resolvers/type-fields.js}}
    {{#if TYPE.owned}}
    {{#if TYPE.owned.name}}{{TYPE.owned.name}}{{else}}user{{/if}},
    {{#if TYPE.owned.name}}{{TYPE.owned.name}}Id{{else}}userId{{/if}},
    {{/if}}
    */
    __typename: TYPE_NAME_{{upper type_name}}
  },
  __typename: TYPE_NAME
};

const resolvers = {
  Query: {
    {{typeName}}State: (_, args, { cache }) => {
      console.log("{{typeName}}State", args, cache)
      const {
        {{typeName}}: { {{typeName}} }
      } = cache.readQuery({ query: {{upper TypeName}}_QUERY_CLIENT });
      return {
        {{typeName}}: {
          ...{{typeName}},
          __typename: TYPE_NAME_{{upper type_name}}
        },
        __typename: TYPE_NAME
      };
    }
  },
  Mutation: {
    on{{TypeName}}Select: async (_, { {{typeName}} }, { cache }) => {
      console.log("on{{TypeName}}Select", {{typeName}}, cache)
      await cache.writeData({
        data: {
          {{typeName}}: {
            ...{{typeName}},
            __typename: TYPE_NAME_{{upper type_name}}
          },
          __typename: TYPE_NAME
        }
      });

      return null;
    }
  }
};

export default {
  defaults,
  resolvers
};
{{/with}}
{{/with}}
{{/with}}
{{/with}}
