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

{{#if MODULE.pages}}
import Pages from './pages';
{{/if}}

const {{camelT MODULE.name}}Module = {
  localization: [{ ns: '{{MODULE.name}}', resources }]
};

export default new ClientModule(

  // pages
  {{#if MODULE.pages}}
  Pages,
  {{/if}}

  // types
  {{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE|}}
  {{camelT TYPE.name}},
  {{/with}}{{/gettype ~}}{{/each}}

  // module
  {{camelT MODULE.name}}Module
);

{{/with}}
