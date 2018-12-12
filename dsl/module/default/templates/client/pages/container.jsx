{{#with DslContext as |MODULE|}}
{{#with RepeatedContext as |PAGE|}}
{{#with (camelT PAGE.name) as |PageName|}}
{{#with (camel  PAGE.name) as |pageName|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import update from 'immutability-helper';


import {{PageName}}Page from './component';

{{> client/pages/sdk-imports.jsx}}

{{> client/pages/sync-graphql-imports.jsx}}
{{> client/pages/sync-add-del.jsx}}
{{> client/pages/update-query-funcs.jsx}}

class {{PageName}}PageContainer extends React.Component {
  static propTypes = {
    {{> client/pages/prop-types.jsx }}

    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  {{> client/pages/container-funcs.jsx}}

  {{> client/pages/container-render.jsx}}
}

export default compose(
  {{> client/pages/container-compose.jsx}}
)({{PageName}}PageContainer);

{{/with}}
{{/with}}
{{/with}}
{{/with}}

