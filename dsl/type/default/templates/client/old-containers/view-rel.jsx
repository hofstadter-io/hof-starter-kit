{{#with DslContext as |TYPE|}}
{{#with RepeatedContext as |VIEW_REL|}}
{{#gettype VIEW_REL.type true}}{{#with . as |REL_TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (camelT REL_TYPE.name) as |RelTypeName|}}
{{#with (camel  REL_TYPE.name) as |relTypeName|}}
{{#with (snake  REL_TYPE.name) as |rel_type_name|}}
{{#with TYPE.pages.view as |VIEW|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

import { IfLoggedIn, IfNotLoggedIn, withLoadedUser } from '../../../user/containers/Auth';

import {{TypeName}}ListC from '../components/view-{{kebab rel_type_name}}-list';
import {{TypeName}}SDK from '../sdk';

{{#each VIEW.relations as |RELATION|}}
{{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |SDK_TYPE|}}
import {{camel RELATION.name}} from '../../../../{{SDK_TYPE.pkg_path}}/{{SDK_TYPE.name}}/sdk'
{{/with}}{{/gettype}}{{/if}}
{{/each}}

{{#if VIEW.sync}}
import {{upper type_name}}_SUBSCRIPTION from '../graphql/subscriptions/solo.graphql';
{{/if}}

class {{TypeName}}View extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    {{typeName}}: PropTypes.object,
    {{#if VIEW.sync}}
    subscribeToMore: PropTypes.func.isRequired,
    {{/if}}
    history: PropTypes.object,
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);
    {{#if VIEW.sync}}
    this.subscription = null;
    {{/if}}
  }

  componentDidMount() {
    {{#if VIEW.sync}}
    if (!this.props.loading) {
      this.init{{TypeName}}Subscription();
    }
    {{/if}}
  }

  componentDidUpdate(prevProps) {
    {{#if VIEW.sync}}
    if (!this.props.loading) {
      let prev{{TypeName}}Id = prevProps.{{typeName}} ? prevProps.{{typeName}}.id : null;
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && prev{{TypeName}}Id !== this.props.{{typeName}}.id) {
        this.subscription();
        this.subscription = null;
      }
      this.init{{TypeName}}Subscription();
    }
    {{/if}}
  }

  componentWillUnmount() {
    {{#if VIEW.sync}}
    if (this.subscription) {
      // unsubscribe
      this.subscription();
      this.subscription = null;
    }
    {{/if}}
  }

  {{#if VIEW.sync}}
  {{/if}}
  init{{TypeName}}Subscription() {
    console.log("{{TypeName}} - SUBSCRP", this.props.{{typeName}})
    if (!this.subscription && this.props.{{typeName}}) {
      this.subscribeTo{{TypeName}}Notifications(this.props.{{typeName}}.{{typeName}}.id);
    }
  }

  subscribeTo{{TypeName}}Notifications = {{typeName}}Id => {
    const { subscribeToMore, history, navigation } = this.props;

    console.log("subscribing:", {{typeName}}Id)

    this.subscription = subscribeToMore({
      document: {{upper type_name}}_SUBSCRIPTION,
      variables: { id: {{typeName}}Id },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: {
              {{typeName}}Notification: { mutation }
            }
          }
        }
      ) => {
        if (mutation === 'DELETED') {
          if (history) {
            return history.push('/{{typeName}}s');
          } else if (navigation) {
            return navigation.goBack();
          }
        }
        return prev;
      }
    });
  };

  render() {
    console.log("{{typeName}} Container RENDER", this.props)
    return <{{TypeName}}ViewC {...this.props} />;
  }
}

export default compose(
  withLoadedUser,

{{#each VIEW.relations as |RELATION|}}
{{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |SDK_TYPE|}}
  {{RELATION.name}}.Create,
  {{RELATION.name}}.Update,
  {{RELATION.name}}.Delete,
{{/with}}{{/gettype}}{{/if}}
{{/each}}

  {{TypeName}}SDK.View,
  {{TypeName}}SDK.Delete
)({{TypeName}}View);


{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}{{/gettype}}
{{/with}}
{{/with}}
