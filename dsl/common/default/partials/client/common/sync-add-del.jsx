{{#each THING.data as |DATA|}}
{{#if DATA.query}}
{{#if DATA.query.sync}}
{{#gettype DATA.type false}}
{{#with . as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}

{{#if (eq DATA.query.type "view")}}

{{else if (eq DATA.query.type "list")}}
function Add{{camelT DATA.name}}(prev, node) {
  {{#each TYPE.relations as |RELATION|}}
  node.{{camel RELATION.name}} = [];
  {{/each}}
  // console.log("Add{{camelT DATA.name}}", prev, node)

  if (prev.{{typeName}}Page) {
    prev.{{camel DATA.name}} = prev.{{typeName}}Page;
  }

  // ignore if duplicate
  if (prev.{{camel DATA.name}}.edges.some(x => node.id === x.cursor)) {
    // console.log("duplicate?")
    return update(prev, {
      {{typeName}}Page: {
        count: {
          $set: prev.{{camel DATA.name}}.count - 1
        },
        edges: {
          $set: prev.{{camel DATA.name}}.edges
        }
      },
      {{camel DATA.name}}: {
        count: {
          $set: prev.{{camel DATA.name}}.count - 1
        },
        edges: {
          $set: prev.{{camel DATA.name}}.edges
        }
      }
    });
  }

  const filtered{{camelT DATA.name}} = prev.{{camel DATA.name}}.edges.filter(x => x.node.id !== null);

  const edge = {
    cursor: node.id,
    node: node,
    __typename: '{{TypeName}}Edges'
  };

  // console.log("new {{TypeName}}?", filtered{{camelT DATA.name}}, edge)
  let ret = update(prev, {
    {{typeName}}Page: {
      count: {
        $set: prev.{{camel DATA.name}}.count + 1
      },
      edges: {
        $set: [...filtered{{camelT DATA.name}}, edge]
      }
    },

    {{camel DATA.name}}: {
      count: {
        $set: prev.{{camel DATA.name}}.count + 1
      },
      edges: {
        $set: [...filtered{{camelT DATA.name}}, edge]
      }
    }
  });

  // console.log("ADD{{camelT DATA.name}} - ret", ret)

  return ret;
}

function Delete{{camelT DATA.name}}(prev, id) {
  if (prev.{{typeName}}Page) {
    prev.{{camel DATA.name}} = prev.{{typeName}}Page;
  }

  const index = prev.{{camel DATA.name}}.edges.findIndex(x => x.node.id === id);

  // console.log("Delete{{camelT DATA.name}} - args", prev, id, index)
  // ignore if not found
  if (index < 0) {
    return prev;
  }

  let ret = update(prev, {
    {{typeName}}Page: {
      totalCount: {
        $set: prev.{{camel DATA.name}}.count - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    },
    {{camel DATA.name}}: {
      totalCount: {
        $set: prev.{{camel DATA.name}}.count - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });

  // console.log("Delete{{camelT DATA.name}} - ret", ret)
  return ret;
}
{{/if}}

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/gettype}}
{{/if}}
{{/if}}
{{/each}}
