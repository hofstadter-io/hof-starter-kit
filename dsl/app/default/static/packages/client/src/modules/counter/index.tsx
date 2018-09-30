import React from 'react';
import { Route } from 'react-router-dom';

import Counter from './containers/Counter';
import clientCounter from './clientCounter';
import reduxCounter from './reduxCounter';
import serverCounter from './serverCounter';
import Feature from '../connector';
import resources from './locales';

export default new Feature(clientCounter, reduxCounter, serverCounter, {
  route: <Route exact path="/counter" component={Counter} />,
  navItem: (
    <MenuItem key="/counter">
      <NavLink to="/counter" className="nav-link" activeClassName="active">
      Counter
      </NavLink>
    </MenuItem>
  ),
  localization: { ns: 'counter', resources }
});
