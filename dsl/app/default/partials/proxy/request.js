{{#if PROXY.download}}
var chunkedBody = null;
var RR = null;
{{/if}}

var r = request(config, function (error, response, body) {

  // TODO response filtering

  if (error) {
    // Print the error if one occurred
    // console.log('error:', error);
    res.status(500).send(error);

  } else {

    {{#if PROXY.download}}
    // intentionally do nothing
    {{else}}
    res.status(response.statusCode).send(body);
    {{/if}}


  }

})
{{#if PROXY.download}}
.on('response', function (R) {

  // TODO response filtering

  RR = R;
  R.on('data', function (chunk) {
    if (chunkedBody) {
      chunkedBody = Buffer.concat([chunkedBody,chunk]);
    } else {
      chunkedBody = chunk;
    }
  })

  R.on('close', function () {
    console.log("close", chunkedBody.length)
    res.status(R.statusCode).send(Buffer.from(chunkedBody));
  })
  R.on('error', function(err) {
    console.log("Error", err)
  })

})
.on('error', function(err) {
  console.log("ERROR", err)
})
.on('close', function () {
  console.log("CLOSE")
    /*
  if (RR) {
    RR.abort();
  }
  */
  // res.status(499).end();
})
{{/if}}

