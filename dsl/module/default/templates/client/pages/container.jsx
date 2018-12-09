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

  render() {
    // console.log("{{pageName}} Container RENDER", this.props)
    return <{{PageName}}Page
    {...this.props}

    {{#each PAGE.data as |DATA|}}
    {{#each DATA.mutations as |MUTATION|}}
    {{#if (eq MUTATION "create")}}
    create{{camelT DATA.name}}={ this.create{{camelT DATA.name}} }
    {{else if (eq MUTATION "update")}}
    update{{camelT DATA.name}}={ this.update{{camelT DATA.name}} }
    {{else if (eq MUTATION "delete")}}
    delete{{camelT DATA.name}}={ this.delete{{camelT DATA.name}} }
    {{/if}}
    {{/each}}
    {{/each}}
  />;
  }
}

export default compose(

  {{> client/pages/container-compose.jsx}}

)({{PageName}}PageContainer);

{{/with}}
{{/with}}
{{/with}}
{{/with}}

