import { _ } from 'lodash';
import request from 'request'
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

  {{#if PROXY.upload}}
  {{#remove_hof_ctx PROXY.upload}}{{#with . as |UPLOAD|}}
  app.use('{{PROXY.route}}', upload.fields({{{json UPLOAD inline=true}}}));
  {{/with}}{{/remove_hof_ctx}}
  {{/if}}

  app.use('{{PROXY.route}}', handler);
};

const auth = async (req, res, next) => {

  console.log("{{PROXY.route}} AUTH - start");

  var context = await ServerModule.createContext(req, res);

  console.log("{{PROXY.route}} AUTH - context");
  // console.log(context)
  // console.log(context.user, context.auth);

  req.context = context;

  console.log("{{PROXY.route}} AUTH - next");
  next();
}

const handler = (req, res, next) => {

  // console.log("{{PROXY.name}} - req\n", req);
  console.log("{{PROXY.name}} - context\n", req.context.user, req.context.auth);
  {{#if PROXY.upload}}
  console.log("{{PROXY.name}} - files\n", req.files);
  var formData = {};
  var multiPart = [];
  for (let key of Object.keys(req.files)) {
    var file = req.files[key][0];
    /*
    formData[key] = file.buffer;
    */
    formData[key] = {
      value: file.buffer,
      options: {
        filename: key,
        size: file.size,
        contentType: file.mimetype
      }
    };
    multiPart.push({
      'content-type': file.mimetype,
      body: file.buffer
    })
  }
  {{/if}}

  var url = req.originalUrl;

  {{#if PROXY.trim-prefix}}
  {{/if}}

  {{#if PROXY.add-prefix}}
  {{/if}}


  // TODO - some request filtering, namely headers and qparams
  const config = {
    timeout: 60000,
    url: '{{PROXY.url}}' + url,
    method: req.method,
    // headers: req.headers,
    {{#if PROXY.upload}}
    formData,
    // multipart: multiPart,
    {{else}}
    body: req.body,
    {{/if}}
  }

  console.log("{{PROXY.name}} - config\n", config);
  var chunkedBody = null;
  var CL1 = 0;
  var CL2 = 0;

  var r = request(config, function (error, response, body) {

    if (error) {
      // Print the error if one occurred
      console.log('error:', error);
      res.status(500).send(error);

    } else {

      // TODO - some response filtering
      //
      // Print the response status code if a response was received
      console.log('statusCode:', response && response.statusCode);
      console.log('headers:', response && response.headers);
      // Print the HTML for the Google homepage.
      // console.log('body:', body);
      // console.log(response)

      console.log('server encoded the data as: ' + (response.headers['content-type'] || 'identity'))
      console.log('BODY all: ', body.length, chunkedBody.length, CL2);
      {{#if PROXY.download}}
      // res.set('Content-Type', response.headers['content-type']);
      /*
      if (chunkedBody.length > 0) {
        console.log("send chunked", chunkedBody.length)
        res.status(response.statusCode).send(Buffer.from(chunkedBody));
      } else {
        console.log("send body", body.length)
        res.status(response.statusCode).send(Buffer.from(body));
      }
      */
      {{else}}
      console.log("send default", body.length)
      res.status(response.statusCode).send(body);
      {{/if}}


    }

  })
  .on('response', function (R) {
    R.on('data', function (chunk) {
      console.log("TYPEOF", typeof(chunk))
      console.log("===========")
      console.log(chunk);
      console.log("===========")
      if (chunkedBody) {
        chunkedBody = Buffer.concat([chunkedBody,chunk]);
      } else {
        chunkedBody = chunk;
      }
      // CL1 += chunkedBody.length;
      CL2 += chunk.length;
      console.log('RESP chunk: ',  chunk.length, chunkedBody.length, CL2);
    })

    {{#if PROXY.download}}
    R.on('close', function () {
      console.log('close all: ', chunkedBody.length, CL2);
      res.status(R.statusCode).send(Buffer.from(chunkedBody));

    })
    {{/if}}
  })

};

export default middleware;

{{/with}}
{{/with}}
