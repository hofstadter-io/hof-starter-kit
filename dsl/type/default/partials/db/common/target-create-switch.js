{{#if (hasprefix MIG.target "fields.")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO field - create - subfield
{{else}}
{{> db/common/type-field-create.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO owned - create - subfield
{{else}}
{{> db/common/type-owner-create.js}}
{{/if}}

{{else if (eq MIG.target "visibility")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO visibility - create - subfield
{{else}}
{{> db/common/type-visibility-create.js}}
{{/if}}

{{else if (hasprefix MIG.target "relations")}}
{{#if (int_gt (length (split MIG.target ".")) 1)}}
{{#with MIG.value as |REL|}}
{{> db/common/type-rel-field-create.js}}
{{/with}}
{{else if (int_gt (length (split MIG.target ".")) 2)}}
// TODO relation - create - subfield
{{else}}
{{#each MIG.value as |REL|}}
{{> db/common/type-rel-field-create.js}}
{{/each}}
{{/if}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
