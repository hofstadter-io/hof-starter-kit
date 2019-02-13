{{#with DslContext as |APP|}}
{{#with RepeatedContext as |PROXY|}}
// PROXY: {{PROXY.name}}

{{> app/default/proxy/imports.js}}

{{#if PROXY.upload}}
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
{{/if}}

const middleware = app => {
  app.use('{{PROXY.route}}', contextMiddleware);

  {{#if PROXY.auth}}
  app.use('{{PROXY.route}}', authMiddleware);
  {{/if}}

  {{#if PROXY.upload}}
  {{#remove_hof_ctx PROXY.upload}}{{#with . as |UPLOAD|}}
  app.use('{{PROXY.route}}', upload.fields({{{json UPLOAD inline=true}}}));
  {{/with}}{{/remove_hof_ctx}}
  {{/if}}

  app.use('{{PROXY.route}}', handler);
};

const handler = async (req, res, next) => {

  var context = req.context;

  {{> app/default/proxy/parse-input.js}}

  {{> app/default/proxy/context-enrich.js}}

  // console.log(context);

  {{> app/default/proxy/auth-checks.js}}

  {{> app/default/proxy/request-config.js}}

  {{> app/default/proxy/request.js}}

};

export default middleware;

{{/with}}
{{/with}}
