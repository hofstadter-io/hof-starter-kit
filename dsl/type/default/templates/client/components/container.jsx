{{#with DslContext as |TYPE|}}
{{#with RepeatedContext as |PAGE|}}
{{#with (camelT PAGE.name) as |PageName|}}
{{#with (camel  PAGE.name) as |pageName|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import update from 'immutability-helper';


import {{PageName}} from './{{PageName}}Component';

{{> client/components/sdk-imports.jsx}}

{{> client/components/sync-graphql-imports.jsx}}
{{> client/components/sync-add-del.jsx}}
{{> client/components/update-query-funcs.jsx}}

class {{PageName}}Container extends React.Component {
  static propTypes = {
    {{> client/common/prop-types.js THING=PAGE }}
  };

  {{> client/components/container-funcs.jsx}}

  {{> client/components/container-render.jsx}}
}

export default compose(
  {{> client/components/container-compose.jsx}}
)({{PageName}}Container);

{{/with}}
{{/with}}
{{/with}}
{{/with}}


