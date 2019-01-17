// target uncreate switch
{{#if (eq MIG.target "field")}}
{{> db/common/type-field-uncreate.js}}
{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
