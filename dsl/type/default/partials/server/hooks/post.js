var requestResult = null;
request({
  method: "{{upper REQUEST.method}}",
  // uri: 'http://studios-apikeys.studios.svc.cluster.local:8080',
  uri: '{{REQUEST.uri}}',
  headers: '{{REQUEST.headers}}'
  json: true,
  body: requestData
}, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  // TODO, provide some filtering or rewrite here
  requestResult = {
    error,
    response,
    body
  }
});
