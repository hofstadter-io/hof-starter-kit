// target unupdate switch
{{#if (eq MIG.target "field")}}
{{> db/common/type-field-unupdate.js}}
{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
