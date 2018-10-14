{{#with DslContext.modules as |MODS|}}
{{#each MODS as |MOD|}}
import {{camelT MOD}} from '../../modules/{{kebab MOD}}/db/migrations';
{{/each}}

exports.up = function(knex, Promise) {
  var migs = [];
  var mig = null;
{{#each MODS as |MOD|}}
  migs.push({{camelT MOD}}.up(knex, Promise));
{{/each}}
  return Promise.all(migs);
};

exports.down = function(knex, Promise) {
  var migs = [];
  var mig = null;
{{#each MODS as |MOD|}}
  migs.push({{camelT MOD}}.down(knex, Promise));
{{/each}}
  return Promise.all(migs);
};

{{/with}}
