{{#with DslContext as |MODULE| }}
{{#with RepeatedContext as |COMPONENT| }}
{{#with (camelT COMPONENT.name) as |ComponentName| }}
{{#with (camel  COMPONENT.name) as |componentName| }}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import update from 'immutability-helper';


import {{ComponentName}} from './{{ComponentName}}Component';

{{> client/components/sdk-imports.jsx }}
{{> client/components/sync-graphql-imports.jsx }}

{{> common/default/client/common/sync-add-del.jsx THING=COMPONENT }}
{{> common/default/client/common/update-query-funcs.jsx THING=COMPONENT }}

class {{ComponentName}}Container extends React.Component {
  static propTypes = {
    {{> common/default/client/common/prop-types.js THING=COMPONENT }}
  };

  {{> common/default/client/common/container-funcs.jsx THING=COMPONENT }}

  {{> common/default/client/common/container-render.jsx THING=COMPONENT }}
}

export default compose(
  {{> common/default/client/common/container-compose.jsx THING=COMPONENT }}
)({{ComponentName}}Container);

{{/with}}
{{/with}}
{{/with}}
{{/with}}


