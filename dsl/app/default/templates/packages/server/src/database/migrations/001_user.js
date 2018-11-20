{{#with DslContext.user.profile as |PROFILE|}}
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('user', table => {
      table.increments();
      table.string('username').unique();
      table.string('email').unique();
      table.string('password_hash');
      table.string('role').defaultTo('user');
      table.boolean('is_active').defaultTo(false);
      table.timestamps(true, true);
    }),

    knex.schema.createTable('user_profile', table => {
      table.increments();

      {{#each PROFILE.fields as |FIELD|}}
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

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('auth_apikey', table => {
      table.increments();
      table.string('apikey').unique();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('auth_certificate', table => {
      table.increments();
      table.string('serial').unique();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('auth_facebook', table => {
      table.increments();
      table.string('fb_id').unique();
      table.string('display_name');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('auth_google', table => {
      table.increments();
      table.string('google_id').unique();
      table.string('display_name');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('auth_github', table => {
      table.increments();
      table.string('gh_id').unique();
      table.string('display_name');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('auth_linkedin', table => {
      table.increments();
      table.string('ln_id').unique();
      table.string('display_name');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.timestamps(true, true);
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auth_certificate'),
    knex.schema.dropTable('auth_facebook'),
    knex.schema.dropTable('auth_google'),
    knex.schema.dropTable('auth_github'),
    knex.schema.dropTable('auth_linkedin'),
    knex.schema.dropTable('user_profile'),
    knex.schema.dropTable('user')
  ]);
};
{{/with}}
