import cookies from './cookies';
import i18n from './i18n';

import user from './user';

{{#each DslContext.modules as |MOD| ~}}
import {{camel MOD}} from './{{kebab MOD}}';
{{/each}}

import contact from './contact';
import mailer from './mailer';
import graphqlTypes from './graphqlTypes';
import './debug';

import ServerModule from './ServerModule';

export default new ServerModule(
  cookies,
  i18n,

  user,

  {{#each DslContext.modules as |MOD| ~}}
  {{!}}  {{camel MOD}},
  {{/each}}

  contact,
  mailer,
  graphqlTypes
);
