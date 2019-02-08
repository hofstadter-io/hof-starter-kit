{{#with DslContext as |TYPE|}}
{{#with RepeatedContext as |PAGE|}}
{{#with (camelT PAGE.name) as |PageName|}}
{{#with (camel  PAGE.name) as |pageName|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import update from 'immutability-helper';


import {{PageName}}Page from './component';

{{> client/pages/sdk-imports.jsx }}
{{> client/pages/sync-graphql-imports.jsx }}

{{> common/default/client/common/sync-add-del.jsx THING=PAGE }}
{{> common/default/client/common/update-query-funcs.jsx THING=PAGE }}

class {{PageName}}PageContainer extends React.Component {
  static propTypes = {
    {{> common/default/client/common/prop-types.js THING=PAGE }}

    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  {{> common/default/client/common/container-funcs.jsx THING=PAGE }}

  {{> common/default/client/common/container-render.jsx THING=PAGE }}
}

export default compose(
  {{> common/default/client/common/container-compose.jsx THING=PAGE }}
)({{PageName}}PageContainer);

{{/with}}
{{/with}}
{{/with}}
{{/with}}

