{{#with MIG.value as |OWNED|}}
/*
{{{json OWNED inline=true}}}
*/
{{#if (eq OWNED.type "has-one")}}
{{#if OWNED.name}}
table.integer('{{snake OWNER.name}}')
  .unique()
{{else}}
table.integer('user_id')
{{/if}}
  .unsigned()
  .references('user.id')
{{/if}}
{{/with}}
