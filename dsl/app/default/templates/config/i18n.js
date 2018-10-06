{{#with DslContext.config.multilang as |LANG|}}
export default {
  enabled: true,
  langPickerRender: {{LANG.picker}},
  langList: [
    {{#each LANG.languages as |L|}}'{{L.code}}',
    {{/each}}
  ],
  fallbackLng: '{{LANG.languages.[0].code}}',
  cookie: 'lang'
};
{{/with}}
