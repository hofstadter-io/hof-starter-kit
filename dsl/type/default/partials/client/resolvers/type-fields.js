{{#each TYPE.fields as |FIELD|}}
{{camel FIELD.name}}: {{#if FIELD.default}}{{{Field.default}}}{{else}}''{{/if}},
{{/each}}
