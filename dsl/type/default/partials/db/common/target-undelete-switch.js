{{#if (hasprefix MIG.target "fields.")}}

{{#if (int_gt (length (split MIG.target ".")) 2)}}
{{else}}
{{> db/common/type-field-undelete.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{> db/common/type-owner-undelete.js}}

{{else if (eq MIG.target "visibility")}}
{{> db/common/type-visibility-undelete.js}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
