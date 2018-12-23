{{#if (eq FIELD.type "string")}}
table.string('{{snake FIELD.name}}'{{#if FIELD.length}}, {{FIELD.length}}{{/if}});
{{else if (eq FIELD.type "text")}}
table.text('{{snake FIELD.name}}');
{{else if (eq FIELD.type "json")}}
table.json('{{snake FIELD.name}}');
{{else if (eq FIELD.type "boolean")}}
table.boolean('{{snake FIELD.name}}');
{{else if (eq FIELD.type "integer")}}
table.integer('{{snake FIELD.name}}');
{{else if (eq FIELD.type "decimal")}}
table.decimal('{{snake FIELD.name}}');
{{else if (eq FIELD.type "date")}}
table.date('{{snake FIELD.name}}');
{{else if (eq FIELD.type "time")}}
table.time('{{snake FIELD.name}}');
{{else if (eq FIELD.type "datetime")}}
table.dateTime('{{snake FIELD.name}}');
{{/if}}
