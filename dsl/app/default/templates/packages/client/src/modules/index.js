import defaultRouter from './defaultRouter';
import i18n from './i18n';

import user from './user';

import contact from './contact';

import layout from './layout';
import pages from './pages';
import pageNotFound from './pageNotFound';
import './favicon';

import ClientModule from './ClientModule';

export default new ClientModule(
  defaultRouter,
  layout,

  user,

  contact,

  pages,
  pageNotFound,
  i18n
);
