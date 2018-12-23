{{#with DslContext as |TYPE|}}
{{#getdsl "app" true}}{{#with . as |APP|}}
// {{APP.name}} {{APP.versionMig}}
exports.up = function(migId, knex, Promise) {
  var migs = [];
  var mig = null;

  switch (migID) {

    {{#each (intloop APP.versionMig) as |MIG_ID|}}
    case {{MIG_ID}}:

      {{> db/mig-up.js}}

      break;

    {{/each}}

    case "next":

      {{> db/next-up.js}}

      break
  }

  /*
  if (migId === "next") {

  }
  */

  return Promise.all(migs);
};

exports.down = function(migId, knex, Promise) {
  var migs = [];

  switch (migID) {

    {{#each (intloop APP.versionMig) as |MIG_ID|}}
    case {{MIG_ID}}:

      {{> db/mig-down.js}}

      break;

    {{/each}}

    case "next":

      {{> db/next-down.js}}

      break
  }


  return Promise.all(migs);
};

{{/with}}{{/getdsl}}
{{/with}}
