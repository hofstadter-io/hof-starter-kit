{{#with DslContext as |TYPE|}}
{{#getdsl "app" true}}{{#with . as |APP|}}
exports.up = function(migId, knex, Promise) {
  var migs = [];
  var mig = null;

  switch (migID) {

    {{#each (intloop APP.versionMig) as |MIG_ID| ~}}
    {{#if (int_gte MIG_ID TYPE.firstAppMigId) ~}}
    case {{MIG_ID}}:

      {{> db/migs/up.js}}

      break;

    {{/if}}
    {{/each}}
  }

  if (migId === "next") {
    {{> db/next/up.js}}
  }

  return Promise.all(migs);
};

exports.down = function(migId, knex, Promise) {
  var migs = [];

  switch (migID) {

    {{#each (intloop APP.versionMig) as |MIG_ID| ~}}
    {{#if (int_gte MIG_ID TYPE.firstAppMigId) ~}}
    case {{MIG_ID}}:

      {{> db/migs/down.js}}

      break;

    {{/if}}
    {{/each}}
  }

  if (migId === "next") {
    {{> db/next/down.js}}
  }

  return Promise.all(migs);
};
{{/with}}{{/getdsl}}
{{/with}}
