{{#if TYPE.visibility.enabled}}
table.boolean('{{snake TYPE.visibility.public}}').default({{TYPE.visibility.default}});
{{/if}}

