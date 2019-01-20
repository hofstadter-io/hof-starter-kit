{{#gettype REL.type true}}{{#with . as |REL_TYPE|}}
{{#if (eq REL.relation "belongs-to-one")}}
table.dropColumn('{{snake REL_TYPE.name}}_id')
{{/if}}
{{/with}}{{/gettype}}
