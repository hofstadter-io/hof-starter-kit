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
  reconcileBatchManyToMany
} from '../../../../sql/batch';

export default function addResolvers(obj) {

  obj = add{{TypeName}}RelationResolvers(obj);

  return obj;
}

function add{{TypeName}}RelationResolvers(obj) {

  {{> server/resolvers/relations.js}}

  return obj;
}

{{/with}}
{{/with}}
{{/with}}
{{/with}}

