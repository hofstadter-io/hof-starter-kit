{{#with RepeatedContext as |PAGE|}}
import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../../../user/containers/Auth';

import ClientModule from '../../../ClientModule';

import Container from './container';

const page = {
  {{#if PAGE.route}}
  route: [
    {{#if PAGE.auth}}
    <AuthRoute
      exact
      path={"{{PAGE.route}}"}
      role={ {{{json PAGE.auth.roles}}} }
      redirect="/login"
      component={ Container }
    />
    {{else}}
    <Route
      exact
      path={"{{PAGE.route}}"}
      component={ Container }
    />
    {{/if}}
  ],
  {{/if}}
}

export default new ClientModule(page);

/*
{{{yaml PAGE}}}
*/

{{/with}}
