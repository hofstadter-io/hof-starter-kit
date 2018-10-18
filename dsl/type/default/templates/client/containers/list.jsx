{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import {{TypeName}}ListC from '../components/list';

import LIST from '../graphql/queries/list.graphql';
// Need Relations queries here
// import SYNC from '../graphql/subscriptions/sync.graphql';

class {{TypeName}}List extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    {{typeName}}: PropTypes.object,
    // subscribeToMore: PropTypes.func.isRequired,
    history: PropTypes.object,
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);
    // this.subscription = null;
  }

  componentDidMount() {
/*
    if (!this.props.loading) {
      this.initPostEditSubscription();
    }
*/
  }

  componentDidUpdate(prevProps) {
/*
    if (!this.props.loading) {
      let prevId = prevProps.post ? prevProps.post.id : null;
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && prevPostId !== this.props.post.id) {
        this.subscription();
        this.subscription = null;
      }
      this.initPostEditSubscription();
    }
*/
  }

  componentWillUnmount() {
/*
    if (this.subscription) {
      // unsubscribe
      this.subscription();
      this.subscription = null;
    }
*/
  }

/*
  initPostEditSubscription() {
    if (!this.subscription && this.props.post) {
      this.subscribeToPostEdit(this.props.post.id);
    }
  }

  subscribeToPostEdit = postId => {
    const { subscribeToMore, history, navigation } = this.props;

    this.subscription = subscribeToMore({
      document: POST_SUBSCRIPTION,
      variables: { id: postId },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: {
              postUpdated: { mutation }
            }
          }
        }
      ) => {
        if (mutation === 'DELETED') {
          if (history) {
            return history.push('/posts');
          } else if (navigation) {
            return navigation.goBack();
          }
        }
        return prev;
      }
    });
  };
*/

  render() {
    console.log("{{typeName}} Container RENDER", this.props)
    return <{{TypeName}}ListC {...this.props} />;
  }
}

export default compose(
  graphql(LIST, {
    options: props => {
      var offset = 0
      var limit = 10

      console.log("{{TypeName}} - list query container", offset, limit)

      return {
        options: { offset, limit }
      };
    },
    props(results) {
      console.log("{{TypeName}} - list props container - results", results)
      let { data } = results;
      console.log("{{TypeName}} - list props container - data", data)
      let { loading, error, {{typeName}}List /*, subscribeToMore*/ } = data;
      let {{typeName}}s = {{typeName}}List ? {{typeName}}List.results : [];
      console.log("{{TypeName}} - list props container - props", loading, error, {{typeName}}s)
      if (error) throw new Error(error);
      return { loading, {{typeName}}s /*, subscribeToMore */};
    }
  }),
)({{TypeName}}List);

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
