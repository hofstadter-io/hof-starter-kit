{{#if THING.current-user}}
currentUser: PropTypes.object.isRequired,
{{/if}}

{{#each THING.data as |DATA|}}
{{#if DATA.query}}
loading{{camelT DATA.name}}: PropTypes.bool.isRequired,
{{camel DATA.name}}: PropTypes.object,
{{#if DATA.query.sync}}
subscribeToMore{{camelT DATA.name}}: PropTypes.func.isRequired,
{{/if}}
{{/if}}
{{/each}}


