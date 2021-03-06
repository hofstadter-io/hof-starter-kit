{{#with DslContext as |TYPE|}}
{{#getdsl "app" true}}{{#with . as |APP|}}
exports.up = function(migId, knex, Promise) {
  var migs = [];
  var mig = null;

  // TODO turn these into lookup tables
  switch (migId) {

    // vMig: '{{APP.versionMig}}'
    {{#each (intloop APP.versionMig) as |MIG_ID| ~}}
    // MIG_ID={{MIG_ID}} - {{TYPE.firstAppMigId}}

    {{#if (int_gte MIG_ID TYPE.firstAppMigId) ~}}
    case {{MIG_ID}}:

      {{> db/migs/up.js}}

      break;

    {{/if}}
    {{/each}}
  }

  {{#if TYPE.hof-migs}}
  if (migId === "next") {
    {{> db/next/up.js}}
  }
  {{/if}}

  return Promise.all(migs);
};

exports.down = function(migId, knex, Promise) {
  var migs = [];

  // TODO turn these into lookup tables
  switch (migId) {

    {{#each (intloop APP.versionMig) as |MIG_ID| ~}}
    {{#if (int_gte MIG_ID TYPE.firstAppMigId) ~}}
    case {{MIG_ID}}:

      {{> db/migs/down.js}}

      break;

    {{/if}}
    {{/each}}
  }

  {{#if TYPE.hof-migs}}
  if (migId === "next") {
    {{> db/next/down.js}}
  }
  {{/if}}

  return Promise.all(migs);
};
{{/with}}{{/getdsl}}
{{/with}}
