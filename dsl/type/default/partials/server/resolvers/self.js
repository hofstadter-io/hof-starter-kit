id: (obj, args, context, info) => {
  return obj.id || null;
},
{{#if TYPE.owned}}
{{#if TYPE.owned.name}}
{{camel TYPE.owned.name}}Id: (obj, args, context, info) => {
  return obj.{{camel TYPE.owned.name}}Id || null;
},
{{else}}
userId: (obj, args, context, info) => {
  return obj.userId || null;
},
{{/if}}
{{/if}}

{{#each TYPE.fields as |FIELD|}}
{{camel FIELD.name}}: (obj, args, context, info) => {
  return obj.{{camel FIELD.name}} || {{#if FIELD.default}}{{FIELD.default}}{{else}}null{{/if}};
},
{{/each}}

{{#if TYPE.visibility.enabled}}
{{#if TYPE.visibility.public}}
{{camel TYPE.visibility.public}}: (obj, args, context, info) => {
  return obj.{{snake TYPE.visibility.public}} || false;
},
{{else}}
isPublic: (obj, args, context, info) => {
  return obj.is_public || false;
},
{{/if}}
{{/if}}

createdAt: (obj, args, context, info) => {
  return obj.createdAt || null;
},
updatedAt: (obj, args, context, info) => {
  return obj.updatedAt || null;
}

