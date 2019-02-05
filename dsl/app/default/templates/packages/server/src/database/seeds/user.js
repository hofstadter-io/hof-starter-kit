import bcrypt from 'bcryptjs';
import { returnId, truncateTables } from '../../sql/helpers';
import { decamelizeKeys } from "humps";

{{#each DslContext.modules as |MOD|}}
{{#getdsl (concat3 "modules." MOD ".module") true}}{{#with . as |MODULE|}}
{{#if MODULE.seeds}}
import {{camelT MOD}}Seed, { clear as {{camelT MOD}}Clear } from '../../modules/{{kebab MOD}}/db/seeds';
{{/if}}
{{/with}}{{/getdsl}}
{{/each}}

import data from '../../../../../user-files/seeds/users.json';
const users = data.users;

export async function seed(knex, Promise) {
  console.log("cleaning modules")
  // clean modules first
{{#each DslContext.modules as |MOD|}}
{{#getdsl (concat3 "modules." MOD ".module") true}}{{#with . as |MODULE|}}
{{#if MODULE.seeds}}
  await {{camelT MOD}}Clear(knex, Promise);
{{/if}}
{{/with}}{{/getdsl}}
{{/each}}

  console.log("cleaning users")
  // then clean users
  await truncateTables(knex, Promise, [
    'user',
    'user_profile',
    'auth_apikey',
    'auth_certificate',
    'auth_facebook',
    'auth_google',
    'auth_github',
    'auth_linkedin'
  ]);


  console.log("SEEDING users")
  for (let user of users) {
    var id = await returnId(knex('user')).insert({
      username: user.username,
      email: user.email,
      password_hash: await bcrypt.hash(user.password, 12),
      role: user.role,
      is_active: user.isActive
    });

    if (user.apikey) {
      await knex('auth_apikey').insert({
        user_id: id[0],
        apikey: user.apikey,
      })
    }

    user.profile.user_id = id[0];

    await returnId(knex('user_profile')).insert(decamelizeKeys(user.profile));
  }

}
