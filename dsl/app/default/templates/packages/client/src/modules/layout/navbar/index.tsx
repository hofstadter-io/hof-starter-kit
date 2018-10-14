import resources from './locales';
import ClientModule from '../../ClientModule';

{{#if DslContext.layout.navbar.custom}}
import NavBar from './containers/NavBarCustom';
{{else}}
import NavBar from './containers/NavBarStatic';
{{/if}}

export default new ClientModule({
  localization: [{ ns: 'navbar', resources }]
});

export { NavBar };
