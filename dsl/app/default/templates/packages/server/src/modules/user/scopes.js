export default {
  admin: ['admin:*', 'user:*', 'owner:*'],
  user: ['user:view:self', 'user:update:self', 'user:*/*', 'owner:*']
};
