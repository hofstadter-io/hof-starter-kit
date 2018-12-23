{{#with DslContext as |TYPE|}}
exports.up = function(migId, knex, Promise) {
  var migs = [];
  var mig = null;

  {{> db/table-create-type-table.js}}

  {{> db/table-create-rels-table.js}}

  return Promise.all(migs);
};

exports.down = function(migId, knex, Promise) {
  var migs = [];

  {{> db/table-drop-type-table.js}}

  {{> db/table-drop-rels-table.js}}

  return Promise.all(migs);
};

{{/with}}

