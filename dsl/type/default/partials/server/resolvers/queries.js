{{#with TYPE.auth as |AUTH|}}

{{> server/resolvers/queries/get.js}}

{{> server/resolvers/queries/list.js}}

{{> server/resolvers/queries/page.js}}

{{> server/resolvers/queries/search.js}}

{{/with}}
