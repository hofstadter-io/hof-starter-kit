{{#each PAGE.data as |DATA|}}
{{#if DATA.query}}
{{#if DATA.query.sync}}
{{#gettype DATA.type false}}
{{#with . as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}

{{#if (eq DATA.query.type "view")}}
import {{upper type_name}}_SUBSCRIPTION from '../../../../../{{replace (trimprefix DATA.type "type.") "." "/" -1}}/graphql/subscriptions/solo.graphql';
{{else if (eq DATA.query.type "list")}}
import {{upper type_name}}S_SUBSCRIPTION from '../../../../../{{replace (trimprefix DATA.type "type.") "." "/" -1}}/graphql/subscriptions/list.graphql';
{{/if}}

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/gettype}}
{{/if}}
{{/if}}
{{/each}}

