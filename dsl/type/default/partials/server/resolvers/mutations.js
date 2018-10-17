{{#with TYPE.auth as |AUTH|}}

{{> server/resolvers/mutations/create.js}}

{{> server/resolvers/mutations/update.js}}

{{> server/resolvers/mutations/delete.js}}

{{/with}}
