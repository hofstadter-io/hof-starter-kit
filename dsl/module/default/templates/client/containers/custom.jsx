{{#with DslContext as |MODULE|}}
{{#with RepeatedContext as |COMPONENT|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import update from 'immutability-helper';

{{#if PAGE.currentUser}}
import { IfLoggedIn, IfNotLoggedIn, withLoadedUser } from '../../user/containers/Auth';
{{/if}}

{{#each COMPONENT.data as |DATA|}}
// {{DATA.type}}
{{#if (eq "type" (trimfrom_first DATA.type "." false))}}
import {{DATA.name}}SDK from '../../../{{replace (trimprefix DATA.type "type.") "." "/" -1}}/sdk';
{{else}}
// unknown DATA type '{{DATA.type}}'
{{/if}}
{{/each}}

import {{camelT COMPONENT.name}}Component from './{{camelT COMPONENT.name}}';

class {{camelT COMPONENT.name}}Container extends React.Component {
  static propTypes = {
    {{#if COMPONENT.currentUser}}
    currentUser: PropTypes.object.isRequired,
    {{/if}}

    {{#each COMPONENT.data as |DATA|}}
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
    console.log("{{COMPONENT.name}} Container RENDER", this.props)
    return <{{camelT COMPONENT.name}}Component {...this.props} />;
  }
}

export default compose(

  {{#if COMPONENT.currentUser}}
  withLoadedUser,
  {{/if}}

  {{#each COMPONENT.data as |DATA|}}

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

