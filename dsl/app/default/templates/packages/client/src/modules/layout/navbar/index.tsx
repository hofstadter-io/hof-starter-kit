import resources from './locales';
import ClientModule from '../../ClientModule';

// import NavBar from './containers/NavBarModules'
import NavBar from './containers/NavBarStatic';

export default new ClientModule({
  localization: [{ ns: 'navbar', resources }]
});

export { NavBar };
