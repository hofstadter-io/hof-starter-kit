{{#each TYPE.relations as |RELATION|}}
{{#gettype RELATION.type true}}{{#with . as |REL_TYPE|}}
{{#if (eq RELATION.relation "many-to-many")}}
add{{camelT REL_TYPE.name}}: createRelationAdapter({
  table: '{{snake TYPE.name}}__{{snake REL_TYPE.name}}',
  elemField: '{{snake TYPE.name}}_id',
  collectionField: '{{snake REL_TYPE.name}}_id'
}),
delete{{camelT REL_TYPE.name}}: deleteRelationAdapter({
  table: '{{snake TYPE.name}}__{{snake REL_TYPE.name}}',
  elemField: '{{snake TYPE.name}}_id',
  collectionField: '{{snake REL_TYPE.name}}_id'
}),
{{/if}}
{{/with}}{{/gettype}}
{{/each}}
