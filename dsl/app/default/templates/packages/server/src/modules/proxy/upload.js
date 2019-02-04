import { _ } from 'lodash';
import request from 'request';
import multer from 'multer';

import Access from '../user/access';
import ServerModule from '../';

{{#with DslContext as |APP|}}
{{#with RepeatedContext as |PROXY|}}
// PROXY: {{PROXY.name}}

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

const middleware = app => {
  {{#if PROXY.auth.enabled}}
  app.use('{{PROXY.route}}', auth);
  {{/if}}
  app.use('{{PROXY.route}}', handler);
};

const auth = async (req, res, next) => {

  console.log("PROXY AUTH - start");

  var context = await ServerModule.createContext(req, res);

  console.log("PROXY AUTH - context");
  console.log(context);

  req.context = context;

  console.log("PROXY AUTH - next");
  next();
}

const handler = (req, res, next) => {

  // console.log("{{PROXY.name}} - req\n", req);
  console.log("{{PROXY.name}} - context\n", req.context);

  var url = req.originalUrl;

  {{#if PROXY.trim-prefix}}
  {{/if}}

  {{#if PROXY.add-prefix}}
  {{/if}}

  // TODO - some request filtering, namely headers and qparams
  const config = {
    url: '{{PROXY.url}}' + url,
    method: req.method,
    headers: req.headers,
    body: req.body,
  }

  request(config, function (error, response, body) {

    if (error) {

      // Print the error if one occurred
      console.log('error:', error);
      res.status(500).send(error);

    } else {

      // Print the response status code if a response was received
      console.log('statusCode:', response && response.statusCode);
      // Print the HTML for the Google homepage.
      console.log('body:', body);

      // TODO - some response filtering

      res.status(response.statusCode).send(body);

    }

  });

};

export default middleware;

{{/with}}
{{/with}}
