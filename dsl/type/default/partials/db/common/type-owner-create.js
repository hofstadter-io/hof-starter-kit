{{#with MIG.value as |OWNED|}}

{{#if (eq OWNED.type "has-one")}}
{{#if OWNED.name}}
table.integer('{{snake OWNER.name}}')
  .unique()
{{else}}
table.integer('user_id')
{{/if}}
  .unsigned()
  .notNullable()
  .references('user.id')
  .onDelete('CASCADE')

{{else}}
// TODO owned - has-many

{{/if}}

{{/with}}
