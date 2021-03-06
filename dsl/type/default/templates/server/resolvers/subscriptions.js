{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
import { _ } from 'lodash';
import { authSwitch } from 'graphql-autharoo';
import { PubSub, withFilter  } from 'graphql-subscriptions';

import log from '../../../../../../common/log';
import FieldError from '../../../../../../common/FieldError';
// import settings from '../../../../../settings';

export default function addResolvers(obj, pubsub) {

  obj = add{{TypeName}}SubscriptionResolvers(obj, pubsub);

  return obj;
}

function add{{TypeName}}SubscriptionResolvers(obj, pubsub) {

  {{> server/resolvers/subscriptions.js}}

  return obj;
}

{{/with}}
{{/with}}
{{/with}}
{{/with}}


