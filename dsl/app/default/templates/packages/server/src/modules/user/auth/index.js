{{#with DslContext as |APP|}}
import AuthModule from './AuthModule';

import apikey from './apikey';
import password from './password';

{{#if APP.auth.oauth.enabled}}
import facebook from './facebook';
import github from './github';
import google from './google';
import linkedin from './linkedIn';
{{/if}}

export default new AuthModule(
  apikey,
  password,

{{#if APP.auth.oauth.enabled}}
  facebook,
  github,
  google,
  linkedin
{{/if}}
);
{{/with}}
