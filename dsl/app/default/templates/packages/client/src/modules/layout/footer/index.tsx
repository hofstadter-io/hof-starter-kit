import resources from './locales';
import ClientModule from '../../ClientModule';

import Footer from './containers/Footer';

export default new ClientModule({
  localization: [{ ns: 'footer', resources }]
});

export { Footer };
