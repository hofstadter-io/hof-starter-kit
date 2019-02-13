var url = req.originalUrl;

{{#if PROXY.trim-prefix}}
if (url.startsWith("{{PROXY.trim-prefix}}")) {
    url = url.slice("{{PROXY.trim-prefix}}".length)
}
{{/if}}

{{#if PROXY.add-prefix}}
url = "PROXY.add-prefix" + url
{{/if}}

// TODO - some request filtering, namely headers and qparams
const config = {
  {{#if PROXY.timeout}}
  timeout: {{PROXY.timeout}},
  {{else}}
  timeout: 60000,
  {{/if}}
  url: '{{PROXY.url}}' + url,
  method: req.method,
  headers,
  // headers: req.headers,
  {{#if PROXY.upload}}
  formData,
  // multipart: multiPart,
  {{else}}
  body: req.body,
  {{/if}}
}

// console.log("{{PROXY.name}} - config\n", config);
