{{#if (hasprefix MIG.target "fields.")}}

{{#if (int_gt (length (split MIG.target ".")) 2)}}
{{else}}
{{> db/common/type-field-delete.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{> db/common/type-owner-delete.js}}

{{else if (eq MIG.target "visibility")}}
{{> db/common/type-visibility-delete.js}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
