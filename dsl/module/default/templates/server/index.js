{{#with DslContext as |MODULE|}}
// {{MODULE.name}}
import ServerModule from "../ServerModule";

import Lib from './db/lib';
import schema from './graphql/schema';
import createResolvers from './resolvers';
// import resources from './locales';

export default new ServerModule({
  schema,
  createResolversFunc: [createResolvers],
  createContextFunc: [async (req, connectionParams, webSocket) => {
    let obj = {};

    // attach the DB libs
    for (let lib in Lib) {
      let L = Lib[lib];
      if (L) {
        obj[lib] = L;
      }
    }

    let { context } = req;
    let { user } = context;

    /*
{{{yaml MODULE.types}}}
    */
    {{#each MODULE.types as |T|}}
    /*
{{{yaml T}}}
    */
    {{#gettype T.type true}}{{#with . as |TYPE| ~}}
    /*
{{{yaml TYPE.owned}}}
    */
    {{#if TYPE.owned}}{{#if TYPE.owned.current-user-with}}
    user.{{camel TYPE.name}} = await Lib.{{camelT TYPE.name}}.getOneFor({id: user.id});
    console.log("{{camelT TYPE.name}} - user", user)
    {{/if}}{{/if}}
    {{/with}}{{/gettype ~}}{{/each}}


    return obj;
  },
  ],

  // localization: [{ ns: 'user', resources }]

});
{{/with}}
