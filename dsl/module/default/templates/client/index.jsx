{{#with DslContext as |MODULE|}}
// {{MODULE.name}}

import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import translate from '../../i18n';
import ClientModule from "../ClientModule";

import resources from './locales';

{{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE| ~}}
import {{camelT TYPE.name}} from './{{kebab TYPE.name}}';
{{/with}}{{/gettype ~}}{{/each}}



export default new ClientModule({
  // route: [<Route exact path="/contact" component={Contact} />],

    localization: [{ ns: '{{MODULE.name}}', resources }]
  },

  {{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE|}}
  {{camelT TYPE.name}}{{#unless @last}},{{/unless ~}}
  {{/with}}{{/gettype ~}}{{/each}}

);

{{/with}}
