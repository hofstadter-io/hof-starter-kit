{{#with DslContext as |MODULE|}}
{{#with RepeatedContext as |PAGE|}}
{{#with (camelT PAGE.name) as |PageName|}}
{{#with (camel  PAGE.name) as |pageName|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import update from 'immutability-helper';

{{#if PAGE.currentUser}}
import { IfLoggedIn, IfNotLoggedIn, withLoadedUser } from '../../../user/containers/Auth';
{{/if}}

{{#each PAGE.data as |DATA|}}
// {{DATA.type}}
{{#if (eq "type" (trimfrom_first DATA.type "." false))}}
import {{DATA.name}}SDK from '../../../../{{replace (trimprefix DATA.type "type.") "." "/" -1}}/sdk';
{{else}}
// unknown DATA type '{{DATA.type}}'
{{/if}}
{{/each}}

import {{PageName}}Page from './component';

class {{PageName}}PageContainer extends React.Component {
  static propTypes = {
    {{#if PAGE.currentUser}}
    currentUser: PropTypes.object.isRequired,
    {{/if}}

    {{#each PAGE.data as |DATA|}}
    // loading{{camelT DATA.name}}: PropTypes.bool.isRequired,
    // {{camel DATA.name}}: PropTypes.object.isRequired,
    {{#if DATA.sync}}
    // subscribeToMore{{camelT DATA.name}}: PropTypes.func.isRequired,
    {{/if}}
    {{/each}}

    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    console.log("{{pageName}} Container RENDER", this.props)
    return <{{PageName}}Page {...this.props} />;
  }
}

export default compose(

  {{#if PAGE.currentUser}}
  withLoadedUser,
  {{/if}}

  {{#each PAGE.data as |DATA|}}

  {{#if DATA.query}}
  {{#if (eq DATA.query.type "view")}}
  {{camel DATA.name}}SDK.View,
  {{else if (eq DATA.query.type "list")}}
  {{camel DATA.name}}SDK.Page,
  {{/if}}
  {{/if}}

  {{#each DATA.mutations as |MUTATION|}}
  {{camel DATA.name}}SDK.{{camelT MUTATION}},
  {{/each}}

  {{/each}}

)({{PageName}}PageContainer);

{{/with}}
{{/with}}
{{/with}}
{{/with}}

