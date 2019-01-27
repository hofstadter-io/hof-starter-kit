{{#with MIG.value as |OWNED|}}

{{#if OWNED.name}}
table.integer('{{snake OWNED.name}}')
{{else}}
table.integer('user_id')
{{/if}}

{{#if (eq OWNED.type "has-one")}}
  .unique()
{{/if}}
  .unsigned()
  .notNullable()
  .references('user.id')
  .onDelete('CASCADE')
  .default(0)

{{/with}}
