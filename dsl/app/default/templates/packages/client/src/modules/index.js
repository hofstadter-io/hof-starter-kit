import defaultRouter from './defaultRouter';
import i18n from './i18n';

import counter from './counter';
import post from './post';
import upload from './upload';
import pagination from './pagination';

import user from './user';
import subscription from './subscription';

import pages from './pages';
import contact from './contact';
import pageNotFound from './pageNotFound';
import './favicon';

import Feature from './connector';

export default new Feature(
  defaultRouter,
  counter,
  post,
  upload,
  user,
  subscription,
  contact,
  pagination,
  pages,
  pageNotFound,
  i18n
);
