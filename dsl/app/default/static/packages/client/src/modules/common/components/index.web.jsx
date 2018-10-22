export * from './web';
export { default as clientOnly } from './clientOnly';

import { library  } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fa } from '@fortawesome/free-regular-svg-icons';

library.add(fab, fas);


