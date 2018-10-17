import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import translate from '../../../i18n';
import ClientModule from "../../ClientModule";

// import Contact from './containers/Contact';

{{#with DslContext as |TYPE|}}
// {{TYPE.name}}


export default new ClientModule({
  // route: [<Route exact path="/contact" component={Contact} />],

});

{{/with}}
