{{#with DslContext as |TYPE|}}
{{#with RepeatedContext as |PAGE|}}
import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../../../../user/containers/Auth';

import ClientModule from '../../../../ClientModule';

import Container from './container';
import resources from '../../../locales';

const page = {
  // should have some backup checking for Type Auth
  {{#if PAGE.route}}
  route: [
    {{#if PAGE.auth}}
    <AuthRoute
      exact
      path={"{{PAGE.route}}"}
      role={ {{{json PAGE.auth.roles inline=true}}} }
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
  localization: [{ ns: '{{TYPE.name}}', resources }],
  {{/if}}
}

export default new ClientModule(page);
{{/with}}
{{/with}}
