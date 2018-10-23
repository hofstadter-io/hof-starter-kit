import resources from './locales';
import ClientModule from '../../ClientModule';

{{#if DslContext.layout.drawer.custom}}
import Drawer from './containers/DrawerCustom';
{{else}}
import Drawer from './containers/DrawerStatic';
{{/if}}

export default new ClientModule({
  localization: [{ ns: 'drawer', resources }]
});

export { Drawer };
