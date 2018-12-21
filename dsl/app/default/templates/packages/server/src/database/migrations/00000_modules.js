{{#each DslContext.modules as |MOD|}}
import {{camelT MOD}} from '../../modules/{{kebab MOD}}/db/migrations';
{{/each}}

exports.up = function(knex, Promise) {
  var migs = [];
  var mig = null;
{{#each DslContext.modules as |MOD|}}
  migs.push({{camelT MOD}}.up(knex, Promise));
{{/each}}
  return Promise.all(migs);
};

exports.down = function(knex, Promise) {
  var migs = [];
  var mig = null;
{{#each DslContext.modules as |MOD|}}
  migs.push({{camelT MOD}}.down(knex, Promise));
{{/each}}
  return Promise.all(migs);
};
