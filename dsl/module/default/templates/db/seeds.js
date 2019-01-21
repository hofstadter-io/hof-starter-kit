{{#with DslContext as |MODULE|}}
// {{MODULE.name}}

import { returnId, truncateTables } from '../../../sql/helpers';
import allData from '../../../../../../user-files/{{MODULE.seeds.file}}';

import Lib from './lib';

console.log(Lib);

export async function clear(knex, Promise) {
  var tables = [];
  {{#each MODULE.types as |T|}}{{#gettype T.type true}}{{#with . as |TYPE|}}
  tables.push('{{snake TYPE.name}}')
  {{#each TYPE.relations as |RELATION|}}
  {{#if (eq RELATION.relation "many-to-many")}}
    {{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
  tables.push('{{snake TYPE.name}}__{{snake REL_TYPE.name}}')
  {{/with}}{{/gettype}}
  {{/if}}
    {{/each}}
  {{/with}}{{/gettype ~}}{{/each}}

  await truncateTables(knex, Promise, tables);
}

export default async function seed(knex, Promise) {

  console.log('Module: {{MODULE.name}} seed data')
  var datas = null;

  {{#each MODULE.seeds.types as |SEEDS|}}
  datas = allData['{{SEEDS.data}}'];
  console.log('{{SEEDS.name}}\n', datas);
  {{#gettype SEEDS.type true}}{{#with . as |TYPE|}}
  {{#if TYPE.owned}}
  for (let data of datas) {
    var uid = await knex('user')
      .where({
        username: data['{{#if TYPE.owned.name}}{{camel TYPE.owned.name}}{{else}}owner{{/if}}']
      })
      .first('id')
      .then(row => row.id)

    console.log("Create For", uid)

    var did = await Lib.{{camelT TYPE.name}}.createFor({
      {{#if TYPE.owned.name}}
      {{snake TYPE.owned.name}}: uid,
      {{else}}
      user_id: uid,
      {{/if}}
      {{#if TYPE.visibility.enabled}}
        {{snake TYPE.visibility.public}}: data['{{camel TYPE.visibility.public}}'] || {{TYPE.visibility.default}},
      {{/if}}
      {{#each TYPE.fields as |FIELD|}}
      {{snake FIELD.name}}: data['{{FIELD.name}}']{{#unless @last}},{{/unless}}
      {{/each}}
    })
      .then(row => {
        console.log("row: ", row);
        return row[0];
      });

    var rels = null;
    {{#each TYPE.relations as |RELATION|}}
    {{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
    rels = data['{{RELATION.name}}']
    console.log('preping to insert:', rels)
    if (rels) {
      for (let rel of rels) {

        {{#if REL_TYPE.owned}}
        var oid = await knex('user')
          .where({
            username: rel['{{#if REL_TYPE.owned.name}}{{camel REL_TYPE.owned.name}}{{else}}owner{{/if}}']
          })
          .first('id')
          .then(row => row.id)

          {{#if (eq RELATION.relation "one-to-one")}}
        await Lib.{{camelT REL_TYPE.name}}.createFor({
          user_id: oid,
          {{#if REL_TYPE.visibility.enabled}}
            {{snake REL_TYPE.visibility.public}}: data['{{camel REL_TYPE.visibility.public}}'] || {{REL_TYPE.visibility.default}},
          {{/if}}
          {{#each REL_TYPE.fields as |FIELD|}}
          {{snake FIELD.name}}: rel['{{FIELD.name}}'],
          {{/each}}
          {{snake TYPE.name}}_id: did
        })
          {{else if (eq RELATION.relation "one-to-many")}}
        await Lib.{{camelT REL_TYPE.name}}.createFor({
          user_id: oid,
          {{#if REL_TYPE.visibility.enabled}}
            {{snake REL_TYPE.visibility.public}}: data['{{camel REL_TYPE.visibility.public}}'] || {{REL_TYPE.visibility.default}},
          {{/if}}
          {{#each REL_TYPE.fields as |FIELD|}}
          {{snake FIELD.name}}: rel['{{FIELD.name}}'],
          {{/each}}
          {{snake TYPE.name}}_id: did
        })
          {{else if (eq RELATION.relation "many-to-many")}}
        // owned, many-to-many
        var lookup = '{{#dotpath RELATION.name SEEDS.lookup true}}{{.}}{{/dotpath}}';
        var rid = await Lib.{{camelT REL_TYPE.name}}.select({
          filters: [{
            field: lookup,
            value: rel[lookup]
          }]
        })
          .then(ret => ret[0].id)

        await Lib.{{camelT TYPE.name}}.add{{camelT REL_TYPE.name}}(did, rid);
          {{/if}}

        {{else}}

          {{#if (eq RELATION.relation "one-to-one")}}
        await Lib.{{camelT REL_TYPE.name}}.create({
          {{#if REL_TYPE.visibility.enabled}}
            {{snake REL_TYPE.visibility.public}}: data['{{camel REL_TYPE.visibility.public}}'] || {{REL_TYPE.visibility.default}},
          {{/if}}
          {{#each REL_TYPE.fields as |FIELD|}}
          {{snake FIELD.name}}: rel['{{FIELD.name}}'],
          {{/each}}
          {{snake TYPE.name}}_id: did
        })
          {{else if (eq RELATION.relation "one-to-many")}}
        await Lib.{{camelT REL_TYPE.name}}.create({
          {{#if REL_TYPE.visibility.enabled}}
            {{snake REL_TYPE.visibility.public}}: data['{{camel REL_TYPE.visibility.public}}'] || {{REL_TYPE.visibility.default}},
          {{/if}}
          {{#each REL_TYPE.fields as |FIELD|}}
          {{snake FIELD.name}}: rel['{{FIELD.name}}'],
          {{/each}}
          {{snake TYPE.name}}_id: did
        })
          {{else if (eq RELATION.relation "many-to-many")}}
        var lookup = '{{#dotpath RELATION.name SEEDS.lookup true}}{{.}}{{/dotpath}}';
        var rid = await Lib.{{camelT REL_TYPE.name}}.select({
          filters: [{
            field: lookup,
            value: rel[lookup]
          }]
        })
          .then(ret => ret[0].id)

        await Lib.{{camelT TYPE.name}}.add{{camelT REL_TYPE.name}}(did, rid);

          {{/if}}

        {{/if}}

      }
    }
    {{/with}}{{/gettype}}
    {{/each}}
  }

  {{else}}
  for (let data of datas) {
    await Lib.{{camelT TYPE.name}}.create(data);
  }
  {{/if}}
  {{/with}}{{/gettype ~}}
  {{/each}}

}
{{/with}}
