{{#each TYPE.fields as |FIELD|}}
<Field
  name="{{camel FIELD.name}}"
  component={RenderField}
  {{#if (eq FIELD.type "string")}}
  type="text"
  {{else if (eq FIELD.type "text")}}
  type="textarea"
  {{else if (eq FIELD.type "datetime")}}
  type="datetime"
  {{else if (eq FIELD.type "date")}}
  type="date"
  {{else if (eq FIELD.type "time")}}
  type="time"
  {{else if (eq FIELD.type "integer")}}
  type="number"
  {{else if (eq FIELD.type "decimal")}}
  type="number"
  {{else if (eq FIELD.type "boolean")}}
  type="checkbox"
  {{else}}
  type="text"
  {{/if}}
  label={t('{{typeName}}.field.{{camel FIELD.name}}')}
  value={ values.{{FIELD.name}} }
/>
{{/each}}

