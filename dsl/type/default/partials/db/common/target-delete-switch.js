// target delete switch
{{#if (eq MIG.target "field")}}
{{> db/common/type-field-delete.js}}
{{else}}
// UNKNOWN MIG.target '{{MIG.target}}'
{{/if}}
