// target undelete switch
{{#if (eq MIG.target "field")}}
{{> db/common/type-field-undelete.js}}
{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
