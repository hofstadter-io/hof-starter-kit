{{#if (hasprefix MIG.target "fields.")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO field - update - subfield
{{else}}
{{> db/common/type-field-update.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO owned - update - subfield
{{else}}
{{> db/common/type-owner-update.js}}
{{/if}}

{{else if (eq MIG.target "visibility")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO visibility - update - subfield
{{else}}
{{> db/common/type-visibility-update.js}}
{{/if}}

{{else if (hasprefix MIG.target "relations")}}
{{#if (int_gt (length (split MIG.target ".")) 1)}}
{{#with MIG.value as |REL|}}
{{> db/common/type-rel-field-update.js}}
{{/with}}
{{else if (int_gt (length (split MIG.target ".")) 2)}}
// TODO relation - update - subfield
{{else}}
{{#each MIG.value as |REL|}}
{{> db/common/type-rel-field-update.js}}
{{/each}}
{{/if}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
