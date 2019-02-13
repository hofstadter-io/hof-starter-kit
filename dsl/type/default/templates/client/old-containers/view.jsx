{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}
{{#with TYPE.pages.view as |VIEW|}}
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import update from 'immutability-helper';

import { IfLoggedIn, IfNotLoggedIn, withLoadedUser } from '../../../user/containers/Auth';

import {{TypeName}}ViewC from '../components/view';
import {{TypeName}}SDK from '../sdk';

{{#each VIEW.relations as |RELATION|}}
{{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
import {{camel RELATION.name}}SDK from '../../../../{{REL_TYPE.pkg_path}}/{{REL_TYPE.name}}/sdk'
{{#if RELATION.sync}}
import {{upper (snake RELATION.name)}}_SUBSCRIPTION from '../../{{kebab REL_TYPE.name}}/graphql/subscriptions/list.graphql';
{{/if}}
{{/with}}{{/gettype}}{{/if}}
{{/each}}

{{#if VIEW.sync}}
import {{upper type_name}}_SUBSCRIPTION from '../graphql/subscriptions/solo.graphql';
{{/if}}

{{#each VIEW.relations as |RELATION|}}
{{#if RELATION.sync}}{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
export function Add{{camelT REL_TYPE.name}}(prev, node) {
  console.log("Add{{camelT REL_TYPE.name}}", prev, node)

  {{#each REL_TYPE.relations as |RELATION2|}}
  if (!node.{{camel RELATION2.name}}) {
    node.{{camel RELATION2.name}} = null;
  }
  {{/each}}

  // ignore if duplicate
  if (prev.{{camel REL_TYPE.name}}Page.edges.some({{camel REL_TYPE.name}} => node.id === {{camel REL_TYPE.name}}.cursor)) {
    let ret = update(prev, {
      {{camel REL_TYPE.name}}Page: {
        count: {
          $set: prev.{{camel REL_TYPE.name}}Page.count  /* + 1 */
        },
        edges: {
          $set: prev.{{camel REL_TYPE.name}}Page.edges
        }
      }
    });
    console.log("Add{{camelT REL_TYPE.name}} - same - ret", ret)
    return ret
  }

  const filtered{{camelT REL_TYPE.name}}s = prev.{{camel REL_TYPE.name}}Page.edges.filter({{camel REL_TYPE.name}} => {{camel REL_TYPE.name}}.node.id !== null);

  const edge = {
    cursor: parseInt(node.id),
    node: node,
    __typename: '{{camelT REL_TYPE.name}}Edge'
  };

  let ret = update(prev, {
    {{camel REL_TYPE.name}}Page: {
      count: {
        $set: prev.{{camel REL_TYPE.name}}Page.count + 1
      },
      edges: {
        $set: [...filtered{{camelT REL_TYPE.name}}s, edge]
      }
    }
  });
  console.log("Add{{camelT REL_TYPE.name}} - diff - ret", ret)
  return ret;
}

function Delete{{camelT REL_TYPE.name}}(prev, id) {
  const index = prev.{{camel REL_TYPE.name}}Page.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    {{camel REL_TYPE.name}}Page: {
      totalCount: {
        $set: prev.{{camel REL_TYPE.name}}Page.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
}

{{/with}}{{/gettype}}{{/if}}
{{/each}}


class {{TypeName}}View extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    {{typeName}}: PropTypes.object,
    {{#if VIEW.sync}}
    subscribeToMore{{TypeName}}: PropTypes.func.isRequired,
    {{/if}}
    history: PropTypes.object,
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);
    {{#if VIEW.sync}}
    this.subscription = null;
    {{/if}}
    {{#each VIEW.relations as |RELATION|}}
    {{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
    {{#if RELATION.sync}}
    this.{{camel REL_TYPE.name}}Subscription = null;
    {{/if}}
    {{/with}}{{/gettype}}{{/if}}
    {{/each}}
  }

  componentDidMount() {
    if (!this.props.loading) {
    {{#if VIEW.sync}}
      this.init{{TypeName}}Subscription();
    {{/if}}

    {{#each VIEW.relations as |RELATION|}}
    {{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
    {{#if RELATION.sync}}
      this.init{{camelT REL_TYPE.name}}Subscription();
    {{/if}}
    {{/with}}{{/gettype}}{{/if}}
    {{/each}}
    }
  }

  componentDidUpdate(prevProps) {
    console.log("{{TypeName}} componentDidUpdate", this.props);
    if (!this.props.loading) {
    {{#if VIEW.sync}}
      let prev{{TypeName}}Id = prevProps.{{typeName}} ? prevProps.{{typeName}}.id : null;
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && prev{{TypeName}}Id !== this.props.{{typeName}}.id) {
        this.subscription();
        this.subscription = null;
      }
      this.init{{TypeName}}Subscription();
    {{/if}}

    {{#each VIEW.relations as |RELATION|}}
    {{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
    {{#if RELATION.sync}}
      // {{REL_TYPE.name}} Subscription
      // const endCursor = this.props.{{camel REL_TYPE.name}}s ? this.props.{{camel REL_TYPE.name}}s.pageInfo.endCursor : 0;
      // const prevEndCursor = prevProps.{{camel REL_TYPE.name}}s ? prevProps.{{camel REL_TYPE.name}}s.pageInfo.endCursor : null;
      const endCursor = this.props.{{camel REL_TYPE.name}}Page ? this.props.{{camel REL_TYPE.name}}Page.pageInfo.endCursor : 0;
      const prevEndCursor = prevProps.{{camel REL_TYPE.name}}Page ? prevProps.{{camel REL_TYPE.name}}Page.pageInfo.endCursor : null;
      // Check if props have changed and, if necessary, stop the subscription
      console.log("Got Here {{RELATION.name}}", prevEndCursor, endCursor)
      if (this.{{camel REL_TYPE.name}}Subscription && prevEndCursor !== endCursor) {
        this.{{camel REL_TYPE.name}}Subscription();
        this.{{camel REL_TYPE.name}}Subscription = null;
      }
      if (!this.{{camel REL_TYPE.name}}Subscription) {
        console.log("SUBSCIBIN''''''", endCursor, this.props.{{typeName}}.{{typeName}}.id)
        this.subscribeTo{{camelT REL_TYPE.name}}List(endCursor, this.props.{{typeName}}.{{typeName}}.id);
      }
    {{/if}}
    {{/with}}{{/gettype}}{{/if}}
    {{/each}}
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
    {{#if VIEW.sync}}
      // unsubscribe
      this.subscription();
      this.subscription = null;
    {{/if}}

    {{#each VIEW.relations as |RELATION|}}
    {{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
    {{#if RELATION.sync}}
      this.{{camel REL_TYPE.name}}Subscription();
      this.{{camel REL_TYPE.name}}Subscription = null;
    {{/if}}
    {{/with}}{{/gettype}}{{/if}}
    {{/each}}
    }
  }

  {{#if VIEW.sync}}
  init{{TypeName}}Subscription() {
    console.log("{{TypeName}} - SUBSCRP", this.props)
    if (!this.subscription && this.props.{{typeName}}) {
      this.subscribeTo{{TypeName}}Notifications(this.props.{{typeName}}.{{typeName}}.id);
    }
  }

  subscribeTo{{TypeName}}Notifications = {{typeName}}Id => {
    const { subscribeToMore{{TypeName}}, history, navigation } = this.props;

    console.log("subscribing:", {{typeName}}Id)

    this.subscription = subscribeToMore{{TypeName}}({
      document: {{upper type_name}}_SUBSCRIPTION,
      variables: { id: {{typeName}}Id },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data
          }
        }
      ) => {
        console.log("{{TypeName}} Subscription Data:", data)
        let { {{typeName}}Subscription: { mutation } } = data;
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
  {{/if}}

  {{#each VIEW.relations as |RELATION|}}
  {{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
  {{#if RELATION.sync}}
  init{{camelT REL_TYPE.name}}Subscription() {
    console.log("{{TypeName}} - SUBSCRP", this.props)
    if (!this.{{camel RELATION.name}}Subscription && this.props.{{camel RELATION.name}}) {
      this.subscribeTo{{camelT REL_TYPE.name}}Notifications(0, this.props.{{typeName}}.{{typeName}}.id);
    }
  }
  subscribeTo{{camelT REL_TYPE.name}}List = (endCursor, {{typeName}}IdStr) => {
    let {{typeName}}Id = parseInt({{typeName}}IdStr);
    console.log("{{REL_TYPE.name}} - subscribing", this.props, endCursor, {{typeName}}IdStr, {{typeName}}Id)
    const { subscribeToMore{{camelT REL_TYPE.name}} } = this.props;

    this.{{camel REL_TYPE.name}}Subscription = subscribeToMore{{camelT REL_TYPE.name}}({
      document: {{upper (snake REL_TYPE.name)}}S_SUBSCRIPTION,
      variables: { endCursor, {{typeName}}Id },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data
          }
        }
      ) => {
        console.log("{{camelT REL_TYPE.name}} - onNotification - data", data)
        let {
          {{camel REL_TYPE.name}}sNotification: { mutation, node }
        } = data;

        let newResult = prev;

        if (mutation === 'CREATED') {
          newResult = Add{{camelT REL_TYPE.name}}(prev, node);
        } else if (mutation === 'DELETED') {
          newResult = Delete{{camelT REL_TYPE.name}}(prev, node.id);
        }

        return newResult;
      }
    });

  };
  {{/if}}
  {{/with}}{{/gettype}}{{/if}}
  {{/each}}

  render() {
    console.log("{{typeName}} Container RENDER", this.props)
    return <{{TypeName}}ViewC {...this.props} />;
  }
}

export default compose(
  withLoadedUser,

{{#each VIEW.relations as |RELATION|}}
{{#if RELATION.sdk}}{{#gettype RELATION.type true}}{{#with . as |SDK_TYPE|}}
  {{RELATION.name}}SDK.ViewClient,
  {{RELATION.name}}SDK.CreateClient,
  {{RELATION.name}}SDK.Page,
  {{RELATION.name}}SDK.Create,
  {{RELATION.name}}SDK.Update,
  {{RELATION.name}}SDK.Delete,
{{/with}}{{/gettype}}{{/if}}
{{/each}}

{{#unless VIEW.omit-sdk}}
  {{TypeName}}SDK.View,
  {{TypeName}}SDK.Delete
{{/unless}}

)({{TypeName}}View);

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
