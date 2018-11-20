import resolvers from './resolvers';
import AuthModule from '../AuthModule';
import settings from '../../../../../../../settings';

export default (settings.user.auth.apikey.enabled
  ? new AuthModule({ createResolversFunc: [resolvers] })
  : undefined);
