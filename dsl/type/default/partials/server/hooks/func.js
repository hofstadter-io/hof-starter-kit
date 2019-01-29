/*
{{{yaml HOOK}}}
*/

{{#if HOOK.hof-func-223}}
const rConfig{{UNIQ}} = {{{json HOOK.hof-func-223 INLINE=true }}};
{{else}}
const rConfig{{UNIQ}} = {
  method: 'POST',
  uri: 'http://{{kebab HOOK.func}}:8080',
};
{{/if}}

rConfig{{UNIQ}}.json = true;
rConfig{{UNIQ}}.body = requestData;

request(rConfig{{UNIQ}}, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  // TODO, provide some filtering or rewrite here
  requestResult = {
    error,
    response,
    data: JSON.parse(body)
  }
});

