{{#with DslContext as |APP|}}
import cookies from './cookies';
import i18n from './i18n';

import user from './user';

{{#each APP.modules as |MOD| ~}}
import {{camel MOD}} from './{{kebab MOD}}';
{{/each}}

/*
   {{#if (and (eq APP.client "studios") (eq APP.name "studios"))}}
 */
import proxy from './proxy';
/*
   {{/if}}
 */


import contact from './contact';
import mailer from './mailer';
import graphqlTypes from './graphqlTypes';
import './debug';

import ServerModule from './ServerModule';

export default new ServerModule(
    cookies,
    i18n,

    user,

    {{#each APP.modules as |MOD| ~}}
    {{!}}  {{camel MOD}},
    {{/each}}

    /*
       {{#if (and (eq APP.client "studios") (eq APP.name "studios"))}}
     */
    proxy,
    /*
       {{/if}}
     */

    contact,
    mailer,
    graphqlTypes
);
{{/with}}
