{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

import { IfLoggedIn, IfNotLoggedIn, withLoadedUser } from '../../../user/containers/Auth';

import {{TypeName}}EditC from '../components/edit';
import {{TypeName}}SDK from '../sdk';
// import SYNC from '../graphql/subscriptions/sync.graphql';

class {{TypeName}}Edit extends React.Component {
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
      let prevPostId = prevProps.post ? prevProps.post.id : null;
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

  initPostEditSubscription() {
    /*
    if (!this.subscription && this.props.post) {
      this.subscribeToPostEdit(this.props.post.id);
    }
    */
  }

    /*
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
    console.log("{{typeName}} Container EDIT RENDER", this.props)
    return <{{TypeName}}EditC {...this.props} />;
  }
}

export default compose(
  withLoadedUser,
  {{TypeName}}SDK.View,
  {{TypeName}}SDK.Update
)({{TypeName}}Edit);

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
