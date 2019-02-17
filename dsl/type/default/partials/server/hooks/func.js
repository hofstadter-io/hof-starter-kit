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

console.log("requestData", requestData);

await request(rConfig{{UNIQ}}).
  then( (data) => {
    console.log('data:', data); // Print the HTML for the Google homepage.
    requestResult = {
      data,
    }
  }).
  catch( (error) => {
    requestResult = {
      error,
    }
  });

console.log('requestResult:', requestResult)

