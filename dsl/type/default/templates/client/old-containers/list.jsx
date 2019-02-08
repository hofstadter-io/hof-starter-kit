{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}
{{#with TYPE.pages.list as |VIEW|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import update from 'immutability-helper';

import { IfLoggedIn, IfNotLoggedIn, withLoadedUser } from '../../../user/containers/Auth';

import {{TypeName}}ListC from '../components/list';
import {{TypeName}}SDK from '../sdk';

{{#if VIEW.sync}}
import {{upper type_name}}S_SUBSCRIPTION from '../graphql/subscriptions/list.graphql';
{{/if}}

export function Add{{TypeName}}(prev, node) {
  {{#each TYPE.relations as |RELATION|}}
  node.{{camel RELATION.name}} = [];
  {{/each}}
  console.log("Add{{TypeName}}", prev, node)

  // ignore if duplicate
  if (prev.{{typeName}}Page.edges.some({{typeName}} => node.id === {{typeName}}.cursor)) {
    return update(prev, {
      {{typeName}}s: {
        count: {
          $set: prev.{{typeName}}Page.count - 1
        },
        edges: {
          $set: prev.{{typeName}}Page.edges
        }
      }
    });
  }

  const filtered{{TypeName}}s = prev.{{typeName}}Page.edges.filter({{typeName}} => {{typeName}}.node.id !== null);

  const edge = {
    cursor: node.id,
    node: node,
    __typename: '{{TypeName}}Edges'
  };

  return update(prev, {
    {{typeName}}Page: {
      count: {
        $set: prev.{{typeName}}Page.count + 1
      },
      edges: {
        $set: [...filtered{{TypeName}}s, edge]
      }
    }
  });
}

function Delete{{TypeName}}(prev, id) {
  const index = prev.{{typeName}}Page.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    {{typeName}}Page: {
      totalCount: {
        $set: prev.{{typeName}}Page.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
}

class {{TypeName}}List extends React.Component {
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
    this.subscription = null;
  }

  componentDidUpdate(prevProps) {
    if (!this.props.loading) {
      const endCursor = this.props.{{typeName}}s ? this.props.{{typeName}}s.pageInfo.endCursor : 0;
      const prevEndCursor = prevProps.{{typeName}}s ? prevProps.{{typeName}}s.pageInfo.endCursor : null;
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && prevEndCursor !== endCursor) {
        this.subscription();
        this.subscription = null;
      }
      if (!this.subscription) {
        this.subscribeTo{{TypeName}}List(endCursor);
      }
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      // unsubscribe
      this.subscription();
      this.subscription = null;
    }
  }

  subscribeTo{{TypeName}}List = endCursor => {
    const { subscribeToMore{{TypeName}} } = this.props;

    this.subscription = subscribeToMore{{TypeName}}({
      document: {{upper type_name}}S_SUBSCRIPTION,
      variables: { endCursor },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data
          }
        }
      ) => {
        console.log("{{TypeName}} - onNotification - data", data)
        let {
          {{typeName}}sNotification: { mutation, node }
        } = data;

        let newResult = prev;

        if (mutation === 'CREATED') {
          newResult = Add{{TypeName}}(prev, node);
        } else if (mutation === 'DELETED') {
          newResult = Delete{{TypeName}}(prev, node.id);
        }

        return newResult;
      }
    });
  };

  render() {
    console.log("{{typeName}} Container RENDER", this.props)
    return <{{TypeName}}ListC {...this.props} />;
  }
}

export default compose(
  {{TypeName}}SDK.Page,
  {{TypeName}}SDK.Delete
)({{TypeName}}List);

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
