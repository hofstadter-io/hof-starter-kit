// target create switch
{{#if (eq MIG.target "field")}}
{{> db/common/type-field-create.js}}
{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
