{{#with DslContext as |MODULE|}}
// {{MODULE.name}}
{{/with}}
import ServerModule from "../../ServerModule";

import Lib from '../db/lib';
import schema from '../graphql/schema';
import createResolvers from './resolvers';
// import resources from './locales';

export default new ServerModule({
  schema,
  createResolversFunc: [createResolvers],
  createContextFunc: [async (req, connectionParams, webSocket) => {
    let obj = {};
    for (let lib in Lib) {
      let L = Lib[lib];
      if (L) {
        obj[lib] = L;
      }
    }
    return obj;
  }],

  // localization: [{ ns: 'user', resources }]

});
