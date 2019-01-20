{{#if (hasprefix MIG.target "fields.")}}

{{#if (int_gt (length (split MIG.target ".")) 2)}}
{{else}}
{{> db/common/type-field-uncreate.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{> db/common/type-owner-uncreate.js}}

{{else if (eq MIG.target "visibility")}}
{{> db/common/type-visibility-uncreate.js}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
