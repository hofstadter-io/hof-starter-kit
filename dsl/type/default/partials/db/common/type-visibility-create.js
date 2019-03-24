{{#with MIG.value as |VIZ|}}
{{#if VIZ.public}}
table.boolean('{{snake TYPE.visibility.public}}').default({{TYPE.visibility.default}});
{{else}}
table.boolean('is_public').default({{TYPE.visibility.default}});
{{/if}}
{{/with}}
