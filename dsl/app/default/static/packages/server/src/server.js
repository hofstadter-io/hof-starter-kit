import http from 'http';
import addGraphQLSubscriptions from './api/subscriptions';

import { serverPort } from './net';
import app from './app';
import log from '../../common/log';

// eslint-disable-next-line import/no-mutable-exports
let server;

server = http.createServer();
server.on('request', app);

addGraphQLSubscriptions(server);

const serverPromise = new Promise(resolve => {
  server.listen(serverPort, () => {
    log.info(`API is now running on port ${serverPort}`);
    resolve(server);
  });
});

server.on('close', () => {
  server = undefined;
});

if (module.hot) {
    module.hot.dispose(() => {
      try {
        if (server) {
          server.close();
        }
      } catch (error) {
        log(error.stack);
      }
    });

  if (process.env.HOF_CLIENT_COMPONENT === 'true') {
    module.hot.accept(['./app'], () => {
      server.removeAllListeners('request');
      server.on('request', app);
    });
  }

  if (process.env.HOF_SERVER_COMPONENT === 'true') {
    module.hot.accept(['./api/subscriptions'], () => {
      try {
        addGraphQLSubscriptions(server);
      } catch (error) {
        log(error.stack);
      }
    });
  }

    module.hot.accept();
}

export default serverPromise;
