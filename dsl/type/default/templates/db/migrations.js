{{#with DslContext as |TYPE|}}
exports.up = function(migId, knex, Promise) {
  var migs = [];
  var mig = null;

  switch (migId) {

    {{#each TYPE.migrations as |MIG|}}
    case {{MIG.appMigId}}:

      {{> db/mig-up.js}}

      break;

    {{/each}}
  }

  if (migId === "next") {
    {{> db/next-up.js}}
  }

  return Promise.all(migs);
};

exports.down = function(migId, knex, Promise) {
  var migs = [];

  switch (migId) {

    {{#each TYPE.migrations as |MIG|}}
    case {{MIG.appMigId}}:

      {{> db/mig-down.js}}

      break;

    {{/each}}
  }

  if (migId === "next") {
    {{> db/next-down.js}}
  }

  return Promise.all(migs);
};
{{/with}}
