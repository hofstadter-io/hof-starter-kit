import bcrypt from 'bcryptjs';
import { returnId, truncateTables } from '../../sql/helpers';

import data from '../../../../../user-files/seeds/users.json';
const users = data.users;

export async function seed(knex, Promise) {
  await truncateTables(knex, Promise, [
    'user',
    'user_profile',
    'auth_certificate',
    'auth_facebook',
    'auth_google',
    'auth_github',
    'auth_linkedin'
  ]);

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
