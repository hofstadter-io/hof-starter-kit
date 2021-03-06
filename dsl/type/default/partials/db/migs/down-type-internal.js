{{! migrations for: fields, visibility, non-extra table owner/rels}}
{{! this section has slightly different if-else-loop structure from its opposite}}
// mig DOWN - {{MIG_ID}} {{#if (eq MIG_ID TYPE.firstAppMigId)}} -- DELETE{{/if}}
{{#if (int_eq MIG_ID TYPE.firstAppMigId)}}
migs.push(knex.schema.dropTable('{{snake TYPE.name}}'))
{{else}}

mig = knex.schema.table('{{snake TYPE.name}}', table => {

{{! RENAME columns FIRST during down}}
{{#each TYPE.migrations as |TMIG|}}
{{#if (eq TMIG.appMigId MIG_ID)}}
{{#each TMIG.migrations as |MIG|}}

{{#with (reverse (split MIG.target ".")) as |ELEMS|}}
{{#if (eq (listelem ELEMS 0) "rename")}}
  // RENAME COLUMN
  /*
  - op: {{listelem ELEMS 0}}
  - field: {{listelem ELEMS 1}}
  - to: {{MIG.value}}
  */
  table.renameColumn('{{MIG.value}}', '{{listelem ELEMS 1}}')
{{/if}}
{{/with}}

{{/each}}
{{/if}}
{{/each}}


{{#each TYPE.migrations as |TMIG|}}
{{#if (eq TMIG.appMigId MIG_ID)}}
{{#each TMIG.migrations as |MIG|}}

  // un-{{MIG.change}} {{MIG.target}}
{{#if (eq MIG.change "create")}}
  {{> db/common/target-uncreate-switch.js}}
{{else if (eq MIG.change "delete")}}
  {{> db/common/target-undelete-switch.js}}
{{else if (eq MIG.change "update")}}
  {{> db/common/target-unupdate-switch.js}}
{{else}}
  // UNKNOWN MIG.change '{{MIG.change}}'
{{/if}}

{{/each}}
{{/if}}
{{/each}}

})
migs.push(mig);

{{/if}}
