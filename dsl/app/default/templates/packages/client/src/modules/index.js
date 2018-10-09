import defaultRouter from './defaultRouter';
import i18n from './i18n';

import user from './user';

import pages from './pages';
import contact from './contact';
import pageNotFound from './pageNotFound';
import './favicon';

import Feature from './connector';

export default new Feature(
  defaultRouter,

  user,

  contact,
  pages,
  pageNotFound,
  i18n
);
