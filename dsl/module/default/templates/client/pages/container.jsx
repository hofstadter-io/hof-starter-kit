{{#with DslContext as |MODULE|}}
{{#with RepeatedContext as |PAGE|}}
{{#with (camelT PAGE.name) as |PageName|}}
{{#with (camel  PAGE.name) as |pageName|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import update from 'immutability-helper';


import {{PageName}} from './component';

{{> client/pages/sdk-imports.jsx }}
{{> client/pages/sync-graphql-imports.jsx }}

{{> client/common/sync-add-del.jsx THING=PAGE }}
{{> client/common/update-query-funcs.jsx THING=PAGE }}

class {{PageName}}PageContainer extends React.Component {
  static propTypes = {
    {{> client/common/prop-types.js  THING=PAGE }}

    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  {{> client/common/container-funcs.jsx THING=PAGE }}

  {{> client/common/container-render.jsx THING=PAGE }}
}

export default compose(
  {{> client/common/container-compose.jsx THING=PAGE }}
)({{PageName}}PageContainer);

{{/with}}
{{/with}}
{{/with}}
{{/with}}

