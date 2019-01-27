import { AuthenticationError } from 'apollo-server-errors';

import AccessModule from '../AccessModule';

import User from '../../sql';

const getCurrentUser = async ({ req }) => {
  console.log("APIKEY getCurrUser")
  const authorization = req && req.headers['authorization'];
  const parts = authorization && authorization.split(' ');
  const apikey = parts && parts.length === 2 && parts[1];
  if (apikey) {
    console.log("APIKEY", apikey)
    try {
      const user = await User.getUserWithApikey(apikey)
      console.log("USER", user)
      if (user) {
        return user;
      }
    } catch(e) {
      console.log("ERROR", e)
    }
  }
};

const createContextFunc = async ({ req, connectionParams, webSocket, context }) => {
  console.log("APIKEY ctx func")
  try {
    context.user = context.user || (await getCurrentUser({ req, connectionParams, webSocket }));
  } catch (e) {
    throw new AuthenticationError(e);
  }
};

export default new AccessModule(
  {
    createContextFunc: [createContextFunc]
  }
);

