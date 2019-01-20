{{#if (hasprefix MIG.target "fields.")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO field - uncreate - subfield
{{else}}
{{> db/common/type-field-uncreate.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO owned - uncreate - subfield
{{else}}
{{> db/common/type-owner-uncreate.js}}
{{/if}}

{{else if (eq MIG.target "visibility")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO visibility - uncreate - subfield
{{else}}
{{> db/common/type-visibility-uncreate.js}}
{{/if}}

{{else if (hasprefix MIG.target "relations")}}
{{#if (int_gt (length (split MIG.target ".")) 1)}}
{{#with MIG.value as |REL|}}
{{> db/common/type-rel-field-uncreate.js}}
{{/with}}
{{else if (int_gt (length (split MIG.target ".")) 2)}}
// TODO relation - uncreate - subfield
{{else}}
{{#each MIG.value as |REL|}}
{{> db/common/type-rel-field-uncreate.js}}
{{/each}}
{{/if}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
