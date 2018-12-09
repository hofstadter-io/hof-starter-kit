import express from 'express';
import path from 'path';

import { isApiExternal } from './net';
import modules from './modules';
import graphiqlMiddleware from './middleware/graphiql';
import createApolloServer from './graphql';
import errorMiddleware from './middleware/error';

console.log("HOF ENV", process.env.HOF_CLIENT_COMPONENT, process.env.HOF_SERVER_COMPONENT)


const app = express();

for (const applyBeforeware of modules.beforeware) {
  applyBeforeware(app);
}

// Don't rate limit heroku
app.enable('trust proxy');

const corsOptions = {
  credentials: true,
  origin: true
};

for (const applyMiddleware of modules.middleware) {
  applyMiddleware(app);
}

if (__DEV__) {
  app.get('/servdir', (req, res) => {
    res.send(process.cwd() + path.sep);
  });
}

if (!isApiExternal && process.env.HOF_SERVER_COMPONENT === 'true') {
  const graphqlServer = createApolloServer();
  graphqlServer.applyMiddleware({
    app,
    path: __API_URL__,
    cors: corsOptions
  });
}

// Workaround: this middleware should be because playground calls next func
// See: https://github.com/prisma/graphql-playground/issues/557
app.get('/graphql', () => {});
app.get('/graphiql', (...args) => graphiqlMiddleware(...args));



let websiteMiddleware = null;

if (process.env.HOF_CLIENT_COMPONENT === 'true') {
  console.log("ADDING WEBSITE MIDDLEWARE")
  websiteMiddleware = require('./middleware/website');
  app.use((...args) => websiteMiddleware(...args));

  app.use(
    '/',
    express.static(__FRONTEND_BUILD_DIR__, {
      maxAge: '180 days'
    })
  );

  if (__DEV__) {
    app.use('/', express.static(__DLL_BUILD_DIR__, { maxAge: '180 days' }));
    app.use(errorMiddleware);
  }

  if (module.hot) {
    module.hot.accept(['./middleware/website']);
  }
}

export default app;
