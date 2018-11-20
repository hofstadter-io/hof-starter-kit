// React
import React from 'react';

// Apollo
import { graphql, compose } from 'react-apollo';

// Components
import ProfileView from '../components/ProfileView';

import CURRENT_USER_QUERY from '../graphql/CurrentUserQuery.graphql';
import GENERATE_APIKEY from '../graphql/GenerateApikey.graphql';

class Profile extends React.Component {
  render() {
    return <ProfileView {...this.props} />;
  }
}

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props: ({ data: { loading, error, currentUser } }) => {
      console.log("GOT HERE")
      if (error) throw new Error(error);
      return { loading, currentUser };
    }
  }),
  graphql(GENERATE_APIKEY, {

    props: (input) => {
      console.log("APIKEY - input", input)
      let { mutate } = input;
      return {
        generateApikey: async id => {
          console.log("APIKEY - gen", id)
          try {
            const {
              data: { generateApikey }
            } = await mutate({
              variables: { id }
            });

            if (generateApikey.errors) {
              return { errors: generateApikey.errors };
            }
          } catch (e) {
            console.log(e.graphQLErrors);
          }
        }
      }
    }

  }))
(Profile);
