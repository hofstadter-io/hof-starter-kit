{{#with MIG.value as |VIZ|}}
{{#if VIZ.public}}
table.dropColumn('{{snake TYPE.visibility.public}}')
{{else}}
table.dropColumn('public')
{{/if}}
{{/with}}
