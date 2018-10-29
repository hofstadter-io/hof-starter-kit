{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
import add{{TypeName}}Resolvers from './self';

import addQueryResolvers from './queries';
import addMutationResolvers from './mutations';
import addSubscriptionResolvers from './subscriptions';

import addOwnedResolvers from './owned';
import addRelationResolvers from './relations';


export default function addResolvers(obj, pubsub) {

  obj = add{{TypeName}}Resolvers(obj, pubsub);

  obj = addQueryResolvers(obj, pubsub);
  obj = addMutationResolvers(obj, pubsub);
  obj = addSubscriptionResolvers(obj, pubsub);

  obj = addOwnedResolvers(obj, pubsub);
  obj = addRelationResolvers(obj, pubsub);

  return obj;
}

{{/with}}
{{/with}}
{{/with}}
{{/with}}
