{{#with DslContext as |TYPE|}}
{{#getdsl (concat2 "module." (replace TYPE.relPath "/" "." -1)) true}}{{#with . as |MODULE| }}
{{#getdsl "app" true}}{{#with . as |APP| }}

// {{TYPE.name}}
import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import { AuthRoute } from '../../user/containers/Auth';

import translate from '../../../i18n';
import ClientModule from "../../ClientModule";

import resolvers from './resolvers';

{{#if TYPE.pages}}
import Pages from './pages';
{{/if}}

export default new ClientModule(
  {{#if TYPE.pages}}
  Pages,
  {{/if}}
  {
    route: [

    ],
    resolver: [resolvers],
  }
);

{{/with}}{{/getdsl}}
{{/with}}{{/getdsl}}
{{/with}}
