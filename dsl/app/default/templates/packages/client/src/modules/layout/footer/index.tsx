import resources from './locales';
import ClientModule from '../../ClientModule';

{{#if DslContext.layout.footer.custom}}
import Footer from './containers/FooterCustom';
{{else}}
import Footer from './containers/FooterDefault';
{{/if}}

export default new ClientModule({
  localization: [{ ns: 'footer', resources }]
});

export { Footer };
