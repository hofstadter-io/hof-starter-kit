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

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
