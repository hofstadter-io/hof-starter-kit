// up type external - many-2-many
{{! migrations for: extra table rels}}

{{#each TYPE.hof-migs as |TMIG|}}
{{#each TMIG.migrations as |MIG|}}

{{! ONLY WANT MANY-2-MANY RELATION MIGRATIONS HERE}}
{{#if (hasprefix MIG.target "relations")}}

  // {{MIG.change}} {{MIG.target}}
{{#if (eq MIG.change "create")}}

  {{#if (int_gt (length (split MIG.target ".")) 1)}}
  {{#with MIG.value as |REL|}}
  {{> db/common/type-rel-table-create.js}}
  {{/with}}
  {{else if (int_gt (length (split MIG.target ".")) 2)}}
  // TODO relation - create - subfield
  {{else}}
  {{#each MIG.value as |REL|}}
  {{> db/common/type-rel-table-create.js}}
  {{/each}}
  {{/if}}

{{else if (eq MIG.change "delete")}}

  {{#if (int_gt (length (split MIG.target ".")) 1)}}
  {{#with MIG.value as |REL|}}
  {{> db/common/type-rel-table-delete.js}}
  {{/with}}
  {{else if (int_gt (length (split MIG.target ".")) 2)}}
  // TODO relation - delete - subfield
  {{else}}
  {{#each MIG.value as |REL|}}
  {{> db/common/type-rel-table-delete.js}}
  {{/each}}
  {{/if}}

{{else if (eq MIG.change "update")}}
  // TODO many-2-many relation upgrades


{{else}}
  // UNKNOWN MIG.change '{{MIG.change}}'
{{/if}}

{{/if}}

{{/each}}
{{/each}}

