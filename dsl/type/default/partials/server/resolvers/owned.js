{{#if TYPE.owned}}
{{#with TYPE.auth as |AUTH|}}
{{#if (eq TYPE.owned.type "has-one")}}

{{> server/resolvers/owned/has-one.js}}

{{/if}}
{{#if (eq TYPE.owned.type "has-many")}}

{{> server/resolvers/owned/has-many.js}}

{{/if}}
{{/with}}
{{/if}}
