import bcrypt from 'bcryptjs';
import { returnId, truncateTables } from '../../sql/helpers';

{{#with DslContext.modules as |MODS|}}
{{#each MODS as |MOD|}}
import {{camelT MOD}}Seed, { clear as {{camelT MOD}}Clear } from '../../modules/{{kebab MOD}}/db/seeds';
{{/each}}

import data from '../../../../../user-files/seeds/users.json';
const users = data.users;

export async function seed(knex, Promise) {
  console.log("cleaning modules")
  // clean modules first
{{#each MODS as |MOD|}}
  await {{camelT MOD}}Clear(knex, Promise);
{{/each}}

  console.log("cleaning users")
  // then clean users
  await truncateTables(knex, Promise, [
    'user',
    'user_profile',
    'auth_certificate',
    'auth_facebook',
    'auth_google',
    'auth_github',
    'auth_linkedin'
  ]);


  console.log("CREATING users")
  for (let user of users) {
    var id = await returnId(knex('user')).insert({
      username: user.username,
      email: user.email,
      password_hash: await bcrypt.hash(user.password, 12),
      role: user.role,
      is_active: user.is_active
    });

    user.profile.user_id = id[0];

    await returnId(knex('user_profile')).insert(user.profile);
  }

}
{{/with}}
