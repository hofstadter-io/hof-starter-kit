{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
import { _ } from 'lodash';
import { authSwitch } from 'graphql-autharoo';

import log from '../../../../../../common/log';
import FieldError from '../../../../../../common/FieldError';
// import settings from '../../../../../settings';

export default function addResolvers(obj) {

  obj = add{{TypeName}}QueryResolvers(obj);

  return obj;
}

function add{{TypeName}}QueryResolvers(obj) {

  {{> server/resolvers/queries.js}}

  return obj;
}

{{/with}}
{{/with}}
{{/with}}
{{/with}}

