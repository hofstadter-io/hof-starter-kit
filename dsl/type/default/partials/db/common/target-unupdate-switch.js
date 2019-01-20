{{#if (hasprefix MIG.target "fields.")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO field - unupdate - subfield
{{else}}
{{> db/common/type-field-unupdate.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO owned - unupdate - subfield
{{else}}
{{> db/common/type-owner-unupdate.js}}
{{/if}}

{{else if (eq MIG.target "visibility")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO visibility - unupdate - subfield
{{else}}
{{> db/common/type-visibility-unupdate.js}}
{{/if}}

{{else if (hasprefix MIG.target "relations")}}
{{#if (int_gt (length (split MIG.target ".")) 1)}}
{{#with MIG.value as |REL|}}
{{> db/common/type-rel-field-unupdate.js}}
{{/with}}
{{else if (int_gt (length (split MIG.target ".")) 2)}}
// TODO relation - unupdate - subfield
{{else}}
{{#each MIG.value as |REL|}}
{{> db/common/type-rel-field-unupdate.js}}
{{/each}}
{{/if}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
