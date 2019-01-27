{{#if TYPE.owned}}
table
  .integer('user_id')
  .unsigned()
  .notNullable()
  .references('id')
  .inTable('user')
  .onDelete('CASCADE');
  table.index('user_id');
{{/if}}
