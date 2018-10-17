{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
import { _ } from 'lodash';
import { createBatchResolver } from 'graphql-resolve-batch';
import { authSwitch } from 'graphql-autharoo';

import log from '../../../../../../common/log';
import FieldError from '../../../../../../common/FieldError';
// import settings from '../../../../../settings';

import {
  reconcileBatchOneToOne,
  reconcileBatchOneToMany,
  reconcileBatchManyToMany
} from '../../../../sql/batch';

export default function addResolvers(obj) {

  obj = add{{TypeName}}Resolvers(obj);

  return obj;
}

function add{{TypeName}}Resolvers(obj) {

  obj.{{TypeName}} = {
    id: (obj, args, context, info) => {
      return obj.id || null;
    },
    {{#if TYPE.owned}}
    {{#if TYPE.owned.name}}
    {{camel TYPE.owned.name}}Id: (obj, args, context, info) => {
      return obj.userId || null;
    },
    {{else}}
    userId: (obj, args, context, info) => {
      return obj.userId || null;
    },
    {{/if}}
    {{/if}}

    {{#each TYPE.fields as |FIELD|}}
    {{camel FIELD.name}}: (obj, args, context, info) => {
      return obj.{{camel FIELD.name}} || {{#if FIELD.default}}{{FIELD.default}}{{else}}null{{/if}};
    },
    {{/each}}

    {{#if TYPE.visibility.enabled}}
    {{#if TYPE.visibility.public}}
    {{camel TYPE.visibility.public}}: (obj, args, context, info) => {
      return obj.{{snake TYPE.visibility.public}} || false;
    },
    {{else}}
    isPublic: (obj, args, context, info) => {
      return obj.is_public || false;
    },
    {{/if}}
    {{/if}}

    createdAt: (obj, args, context, info) => {
      return obj.createdAt || null;
    },
    updatedAt: (obj, args, context, info) => {
      return obj.updatedAt || null;
    }

  }


  {{> server/resolvers/queries.js}}

  {{> server/resolvers/mutations.js}}

  return obj;
}

{{/with}}
{{/with}}
{{/with}}
{{/with}}
