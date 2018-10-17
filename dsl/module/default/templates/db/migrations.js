{{#with DslContext as |MODULE|}}
exports.up = function(knex, Promise) {
  var migs = [];
  var mig = null;

  {{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE|}}
  mig = knex.schema.createTable('{{snake TYPE.name}}', table => {
    table.increments();
    table.timestamps(true, true);

    {{#each TYPE.fields as |FIELD|}}
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
      {{/each}}
    {{#if TYPE.visibility.enabled}}
      table.boolean('{{snake TYPE.visibility.public}}').default({{TYPE.visibility.default}});
    {{/if}}

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
      {{#each TYPE.relations as |RELATION|}}
    {{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
    {{#if (eq RELATION.relation "belongs-to-one")}}
      table
    .integer('{{snake REL_TYPE.name}}_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('{{snake REL_TYPE.name}}')
    .onDelete('CASCADE');
    table.index('{{snake REL_TYPE.name}}_id');
    {{/if}}
      {{/with}}{{/gettype}}
    {{/each}}

  })
  migs.push(mig);
  {{/with}}{{/gettype ~}}{{/each}}

  {{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE|}}
  {{#each TYPE.relations as |RELATION|}}
  {{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
  {{#if (eq RELATION.relation "many-to-many")}}
    // many-to-many table
    mig = knex.schema.createTable('{{snake TYPE.name}}__{{snake REL_TYPE.name}}', table => {
      table.increments();
      table.timestamps(true, true);
      table
        .integer('{{snake TYPE.name}}_id')
        .unsigned()
        .notNullable()
        .references('{{snake TYPE.name}}.id')
        .onDelete('CASCADE');
      table
        .integer('{{snake REL_TYPE.name}}_id')
        .unsigned()
        .notNullable()
        .references('{{snake REL_TYPE.name}}.id')
        .onDelete('CASCADE');

      table.index(['{{snake TYPE.name}}_id', '{{snake REL_TYPE.name}}_id']);
    })
    migs.push(mig);
    {{/if}}
      {{/with}}{{/gettype}}
    {{/each}}

    {{/with}}{{/gettype ~}}{{/each}}

    return Promise.all(migs);
};

exports.down = function(knex, Promise) {
  var migs = [];

  {{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE|}}
  migs.push(knex.schema.dropTable('{{snake TYPE.name}}'))
  {{#each TYPE.relations as |RELATION|}}
  {{#if (eq RELATION.relation "many-to-many")}}
    {{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
  // many-to-many table
  migs.push(knex.schema.dropTable('{{snake TYPE.name}}__{{snake REL_TYPE.name}}'))
  {{/with}}{{/gettype}}
  {{/if}}
    {{/each}}
  {{/with}}{{/gettype ~}}{{/each}}

  return Promise.all(migs);
};

{{/with}}
