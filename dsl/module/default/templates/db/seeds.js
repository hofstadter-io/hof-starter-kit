{{#with DslContext as |MODULE|}}
// {{MODULE.name}}
{{/with}}

import { returnId, truncateTables } from '../../../sql/helpers';

/*
import data from '../../../../../user-files/seeds/users.json';
const users = data.users;
*/

export default async function seed(knex, Promise) {
  var tables = [];
  {{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE|}}
  tables.push('{{snake TYPE.name}}')
  {{#each TYPE.relations as |RELATION|}}
  {{#if (eq RELATION.relation "many-to-many")}}
    {{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
  tables.push('{{snake TYPE.name}}__{{snake REL_TYPE.name}}')
  {{/with}}{{/gettype}}
  {{/if}}
    {{/each}}
  {{/with}}{{/gettype ~}}{{/each}}
  await truncateTables(knex, Promise, tables);

}
