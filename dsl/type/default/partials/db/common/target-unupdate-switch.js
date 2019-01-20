{{#if (hasprefix MIG.target "fields.")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO field - unupdate - subfield
{{else}}
{{> db/common/type-field-unupdate.js}}
{{/if}}

{{else if (eq MIG.target "owned")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO owned - unupdate - subfield
{{else}}
{{> db/common/type-owner-unupdate.js}}
{{/if}}

{{else if (eq MIG.target "visibility")}}
{{#if (int_gt (length (split MIG.target ".")) 2)}}
// TODO visibility - unupdate - subfield
{{else}}
{{> db/common/type-visibility-unupdate.js}}
{{/if}}

{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
