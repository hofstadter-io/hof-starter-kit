{{#with MIG.value as |OWNED|}}

{{#if (eq OWNED.type "has-one")}}
{{#if OWNED.name}}
table.dropColumn('{{snake OWNER.name}}')
{{else}}
table.dropColumn('user_id')
{{/if}}

{{else}}
// TODO owned - has-many

{{/if}}

{{/with}}
