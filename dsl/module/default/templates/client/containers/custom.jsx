{{#with DslContext as |MODULE|}}
{{#with RepeatedContext as |COMPONENT|}}
{{#with (camelT COMPONENT.name) as |ComponentName|}}
{{#with (camel  COMPONENT.name) as |componentName|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import update from 'immutability-helper';

import {{ComponentName}}Component from './{{ComponentName}}';

{{> client/components/sdk-imports.jsx}}

{{> client/components/sync-graphql-imports.jsx}}
{{> client/components/sync-add-del.jsx}}
{{> client/components/update-query-funcs.jsx}}

class {{ComponentName}}Container extends React.Component {
  static propTypes = {
    {{> client/components/prop-types.jsx }}
  };

  {{> client/components/container-funcs.jsx}}

  {{> client/components/container-render.jsx}}
}

export default compose(
  {{> client/components/container-compose.jsx}}
)({{ComponentName}}Container);

{{/with}}
{{/with}}
{{/with}}
{{/with}}
