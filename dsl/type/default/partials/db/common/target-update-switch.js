// target update switch
{{#if (eq MIG.target "field")}}
{{> db/common/type-field-update.js}}
{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
