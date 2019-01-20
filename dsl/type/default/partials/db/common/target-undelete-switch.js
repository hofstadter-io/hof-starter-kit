{{#if (hasprefix MIG.target "fields.")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO field - undelete - subfield
{{else}}
{{> db/common/type-field-undelete.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO owned - undelete - subfield
{{else}}
{{> db/common/type-owner-undelete.js}}
{{/if}}

{{else if (eq MIG.target "visibility")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO visibility - undelete - subfield
{{else}}
{{> db/common/type-visibility-undelete.js}}
{{/if}}

{{else if (hasprefix MIG.target "relations")}}
{{#if (int_gt (length (split MIG.target ".")) 1)}}
{{#with MIG.value as |REL|}}
{{> db/common/type-rel-field-undelete.js}}
{{/with}}
{{else if (int_gt (length (split MIG.target ".")) 2)}}
// TODO relation - undelete - subfield
{{else}}
{{#each MIG.value as |REL|}}
{{> db/common/type-rel-field-undelete.js}}
{{/each}}
{{/if}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
