{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
import { _ } from 'lodash';
import { createBatchResolver } from 'graphql-resolve-batch';
import { authBatching } from 'graphql-autharoo';

import log from '../../../../../../common/log';
import FieldError from '../../../../../../common/FieldError';
// import settings from '../../../../../settings';

import { orderedFor } from '../../../../sql/helpers';
import {
  reconcileBatchOneToOne,
  reconcileBatchOneToMany,
} from '../../../../sql/batch';

export default function addResolvers(obj) {

  obj = add{{TypeName}}OwnedResolvers(obj);

  return obj;
}

function add{{TypeName}}OwnedResolvers(obj) {

  {{> server/resolvers/owned.js}}

  return obj;
}

{{/with}}
{{/with}}
{{/with}}
{{/with}}

