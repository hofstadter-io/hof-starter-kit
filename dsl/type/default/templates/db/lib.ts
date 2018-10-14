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
  deleteAdapter,
  deleteMultiConditionAdapter,
  getManyRelationAdapter,
  createRelationAdapter,
  deleteRelationAdapter
} from "../../../../../../sql/crud";

import selectAdapter from "../../../../../../sql/select";
import { orderedFor } from "../../../../../../sql/batching";

{{#with DslContext as |TYPE|}}

export default {
  get: getAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
  getMany: listAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
  paging: pagingAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),

  {{#if TYPE.owned}}
    createFor: createWithIdAdapter({ table: '{{snake TYPE.name}}', idField: 'user_id' }),
  updateFor: updateAdapter({ table: '{{snake TYPE.name}}', idField: 'user_id' }),
  deleteFor: deleteAdapter({ table: '{{snake TYPE.name}}', idField: 'user_id' }),

  getFor: getAdapter({ table: '{{snake TYPE.name}}', idField: 'user_id' }),
  getManyFor: listAdapter({ table: '{{snake TYPE.name}}', idField: 'user_id' }),
  pagingFor: pagingAdapter({ table: '{{snake TYPE.name}}', idField: 'user_id' }),
  {{else}}

    create: createWithoutIdAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
    update: updateAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
    delete: deleteAdapter({ table: '{{snake TYPE.name}}', idField: 'id' }),
    {{/if}}
}

/*
//////////////
{{{yaml TYPE}}}
//////////////
 */

{{/with}}
