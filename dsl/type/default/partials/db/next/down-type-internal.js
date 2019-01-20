{{! migrations for: fields, visibility, non-extra table owner/rels}}
{{! this section has slightly different if-else-loop structure from its opposite}}
// next DOWN - '{{TYPE.firstAppMigId}}' ~ {{#unless TYPE.firstAppMigId}} -- DELETE{{/unless}}
{{#if TYPE.version}}
mig = knex.schema.table('{{snake TYPE.name}}', table => {

{{! RENAME columns FIRST during down}}
{{#each TYPE.hof-migs as |TMIG|}}
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
{{/each}}

{{#each TYPE.hof-migs as |TMIG|}}
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
{{/each}}

})
migs.push(mig);

{{else}}
migs.push(knex.schema.dropTable('{{snake TYPE.name}}'))
{{/if}}
