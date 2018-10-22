{{#if DslContext.layout.page.custom}}
import PageLayout from './containers/PageLayoutCustom';
{{else}}
import PageLayout from './containers/PageLayoutStatic';
{{/if}}

export { PageLayout };
