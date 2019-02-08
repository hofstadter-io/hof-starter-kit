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

{{#each TYPE.pages as |PAGE|}}
{{#unless PAGE.disabled}}
import {{camelT TYPE.name}}{{camelT PAGE.name}} from './pages/{{kebab PAGE.name}}';
{{/unless}}
{{/each}}

export default new ClientModule({
  route: [

    {{#each TYPE.pages as |PAGE|}}
    {{#unless PAGE.disabled}}

    {{#if PAGE.auth.disabled}}
    {{else}}
    <AuthRoute
      exact path="{{MODULE.route}}{{TYPE.route}}{{PAGE.route}}"
      redirect="{{#if PAGE.redirect}}{{PAGE.redirect}}{{else}}/login{{/if}}"
      role={ {{{json PAGE.auth.roles inline=true}}} }
      component={ {{camelT TYPE.name}}{{camelT PAGE.name}} }
    />,
    {{/if}}

    {{/unless}}
    {{/each}}
  ],
  resolver: [resolvers],
});

{{/with}}{{/getdsl}}
{{/with}}{{/getdsl}}
{{/with}}
