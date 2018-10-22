{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
import add{{TypeName}}Resolvers from './self';

import addQueryResolvers from './queries';
import addMutationResolvers from './mutations';

import addOwnedResolvers from './owned';
import addRelationResolvers from './relations';


export default function addResolvers(obj) {

  obj = add{{TypeName}}Resolvers(obj);

  obj = addQueryResolvers(obj);
  obj = addMutationResolvers(obj);

  obj = addOwnedResolvers(obj);
  obj = addRelationResolvers(obj);

  return obj;
}

{{/with}}
{{/with}}
{{/with}}
{{/with}}
