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

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
