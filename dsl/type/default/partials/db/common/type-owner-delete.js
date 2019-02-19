{{#with MIG.value as |OWNED|}}

{{#if (eq OWNED.type "has-one")}}
{{#if OWNED.name}}
table.dropColumn('{{snake OWNER.name}}_id')
{{else}}
table.dropColumn('user_id')
{{/if}}

{{else}}
// TODO owned - has-many ? correct
{{#if OWNED.name}}
table.dropColumn('{{snake OWNER.name}}_id')
{{else}}
table.dropColumn('user_id')
{{/if}}

{{/if}}

{{/with}}
