{{#with DslContext as |APP|}}
import express from 'express';
import path from 'path';

import { isApiExternal } from './net';
import modules from './modules';
import websiteMiddleware from './middleware/website';
import createApolloServer from './graphql';
import errorMiddleware from './middleware/error';

const app = express();

for (const applyBeforeware of modules.beforewares) {
  applyBeforeware(app);
}

// Don't rate limit heroku
app.enable('trust proxy');

const corsOptions = {
  credentials: true,
  origin: true
};

for (const applyMiddleware of modules.middlewares) {
  applyMiddleware(app);
}

if (__DEV__) {
  app.get('/servdir', (req, res) => {
    res.send(process.cwd() + path.sep);
  });
}

if (!isApiExternal) {
  const graphqlServer = createApolloServer();
  graphqlServer.applyMiddleware({
    app,
    path: __API_URL__,
    cors: corsOptions
  });
}

{{#if (and (ne APP.mode "live") (ne APP.mode "prod"))}}
// Workaround: this middleware should be because playground calls next func
// See: https://github.com/prisma/graphql-playground/issues/557
if (__DEV__) {
    app.get('/graphql', () => {});
}
{{/with}}

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

export default app;
{{/with}}