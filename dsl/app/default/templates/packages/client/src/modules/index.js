import defaultRouter from './defaultRouter';
import i18n from './i18n';

import layout from './layout';
import pages from './pages';

import user from './user';
import contact from './contact';

{{#each DslContext.modules as |MOD| ~}}
import {{camel MOD}} from './{{kebab MOD}}';
{{/each}}


import pageNotFound from './pageNotFound';
import './favicon';

import ClientModule from './ClientModule';

export default new ClientModule(
  defaultRouter,
  layout,
  pages,

  user,
  contact,

  {{#each DslContext.modules as |MOD| ~}}
  {{!}}  {{camel MOD}},
  {{/each}}

  pageNotFound,
  i18n
);
