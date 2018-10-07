import React from 'react';
import Helmet from 'react-helmet';

import * as RS from 'reactstrap'

import { PageLayout } from '../../common/components/web';
import settings from '../../../../../../settings';
import translate, { TranslateFunction } from '../../../i18n';
 interface HomeProps {
  t: TranslateFunction;
}
 const Home = ({ t }: HomeProps) => (
  <PageLayout>
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('meta')}`
        }
      ]}
    />
    <div>
      {{{file "pages/home.html"}}}
    </div>
  </PageLayout>
);
 export default translate('home')(Home);
