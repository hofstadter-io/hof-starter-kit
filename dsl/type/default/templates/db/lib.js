import _ from "lodash";
import { camelizeKeys } from "humps";

import {
  getAdapter,
  listAdapter,
  pagingAdapter,
  createWithIdGenAdapter,
  createWithIdAdapter,
  createWithoutIdAdapter,
  updateAdapter,
  updateMultiConditionAdapter,
  deleteAdapter,
  deleteMultiConditionAdapter,
  getManyRelationAdapter,
  createRelationAdapter,
  deleteRelationAdapter
} from "../../../sql/crud";

import selectAdapter from "../../../sql/select";
import { orderedFor } from "../../../sql/batch";

{{#with DslContext as |TYPE|}}

export default {
  create: createWithoutIdAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
  update: updateAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
  delete: deleteAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),

  select: selectAdapter({ table: '{{snake TYPE.name}}' }),
  get: getAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
  getMany: listAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
  paging: pagingAdapter({ table: '{{snake TYPE.name}}', idField: 'id', printSQL: true}),

  {{#if TYPE.owned}}
  createFor: createWithoutIdAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
  updateFor: updateMultiConditionAdapter({
    table: '{{snake TYPE.name}}',
    idField: 'id',
  }),
  deleteFor: deleteMultiConditionAdapter({
    table: '{{snake TYPE.name}}',
    idField: 'id',
  }),

  getFor: getAdapter({
    table: '{{snake TYPE.name}}',
    idField: 'id',
    filters: [{
      bool: 'and',
      field: 'user_id',
      compare: '=',
      valueExtractor: args => args.userId
    }]
  }),
  getManyFor: listAdapter({
    table: '{{snake TYPE.name}}',
    idField: 'user_id',
    filters: [{
      bool: 'and',
      field: 'user_id',
      compare: '=',
      valueExtractor: args => args.userId
    }]
  }),
  pagingFor: pagingAdapter({
    table: '{{snake TYPE.name}}',
    idField: 'user_id',
    filters: [{
      bool: 'and',
      field: 'user_id',
      compare: '=',
      valueExtractor: args => args.userId
    }]
  }),
  {{/if}}

  {{#each TYPE.relations as |RELATION|}}
  {{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
  {{#if (eq RELATION.relation "many-to-many")}}
  add{{camelT REL_TYPE.name}}: createRelationAdapter({
    table: '{{snake TYPE.name}}__{{snake REL_TYPE.name}}',
    elemField: '{{snake TYPE.name}}_id',
    collectionField: '{{snake REL_TYPE.name}}_id'
  }),
  delete{{camelT REL_TYPE.name}}: deleteRelationAdapter({
    table: '{{snake TYPE.name}}__{{snake REL_TYPE.name}}',
    elemField: '{{snake TYPE.name}}_id',
    collectionField: '{{snake REL_TYPE.name}}_id'
  }),
  {{/if}}
  {{/with}}{{/gettype}}
  {{/each}}

  {{#if TYPE.search}}
  // Search helpers
  {{#with TYPE.search as |Search|}}
  search: pagingAdapter({
    table: '{{snake TYPE.name}}',
    filters: [
      {{#each Search.fields as |FIELD|}}
      {
        bool: 'or',
        field: '{{snake FIELD}}',
        compare: 'like',
        valueExtractor: args => `${args.searchText}`
      },
      {{/each}}
      {{#each Search.relation as |SearchRel|}}
      // relation {{SearchRel}}
      {{/each}}

    ]
  }),
  {{/with}}
  {{/if}}

}

{{/with}}
