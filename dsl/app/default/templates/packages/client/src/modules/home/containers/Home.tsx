import React from 'react';
import Helmet from 'react-helmet';
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
    <h1>Welcome to {{DslContext.name}}</h1>
  </PageLayout>
);
 export default translate('home')(Home);
