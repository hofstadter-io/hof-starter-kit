import React from 'react';
import { Route } from 'react-router-dom';
 import Home from './containers/Home';
import Feature from '../connector';
import resources from './locales';
 export default new Feature({
  route: <Route exact path="/" component={Home} />,
  localization: { ns: 'home', resources }
});
