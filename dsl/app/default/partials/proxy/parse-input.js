// console.log("RH", req.headers)
var headers = {
{{#each PROXY.headers as |HEADER|}}
  {{#if HEADER.src}}
  '{{HEADER.dst}}': req.headers['{{HEADER.src}}'],
  {{else}}
  '{{HEADER}}': req.headers['{{HEADER}}'],
  {{/if}}
{{/each}}
};
{{#if PROXY.upload}}
// File Upload in form Data
var formData = {};
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
}
{{/if}}
