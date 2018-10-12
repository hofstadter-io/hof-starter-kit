{{#with RepeatedContext as |PAGE|}}
import React from 'react';
import { Route } from 'react-router-dom';

import Feature from '../../ClientModule';

import {{camelT PAGE.name}} from './containers/{{camelT PAGE.name}}';
import resources from './locales';

export default new Feature({
  route: [<Route exact path="{{PAGE.route}}" component={ {{camelT PAGE.name}} } />],
  localization: [{ ns: '{{PAGE.name}}', resources }]
});
{{/with}}
