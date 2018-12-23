{{#each DslContext.types as |TYPE|}}
import {{camelT TYPE.name}} from './migs/{{kebab TYPE.name}}';
{{/each}}

exports.up = function(migId, knex, Promise) {
  var migs = [];
  var mig = null;
{{#each DslContext.types as |TYPE|}}
  migs.push({{camelT TYPE.name}}.up(migId, knex, Promise));
{{/each}}
  return Promise.all(migs);
};

exports.down = function(migId, knex, Promise) {
  var migs = [];
  var mig = null;
{{#each DslContext.types as |TYPE|}}
  migs.push({{camelT TYPE.name}}.down(migId, knex, Promise));
{{/each}}
  return Promise.all(migs);
};

// APP Migrations
//
// Current: {{DslContext.versionMig}}
// Next:    {{DslContext.versionNext}}
/* With:
{{yaml RepeatedContext}}
*/

