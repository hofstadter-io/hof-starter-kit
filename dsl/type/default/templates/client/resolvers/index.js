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
    {{> client/resolvers/type-fields.js}}
    __typename: TYPE_NAME_{{upper type_name}}
  },
  __typename: TYPE_NAME
};

const resolvers = {
  Query: {
    {{typeName}}State: (_, args, { cache }) => {
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
