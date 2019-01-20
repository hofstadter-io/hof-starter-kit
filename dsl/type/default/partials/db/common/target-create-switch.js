{{#if (hasprefix MIG.target "fields.")}}

{{#if (int_gt (length (split MIG.target ".")) 2)}}
{{else}}
{{> db/common/type-field-create.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{> db/common/type-owner-create.js}}

{{else if (eq MIG.target "visibility")}}
{{> db/common/type-visibility-create.js}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
