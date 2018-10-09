{{#with RepeatedContext as |PAGE|}}
import React from 'react';
import Helmet from 'react-helmet';

import * as RS from 'reactstrap'
import settings from '../../../../../../../settings';

import { PageLayout } from '../../../common/components/web';
import translate, { TranslateFunction } from '../../../../i18n';

interface {{camelT PAGE.name}}Props {
  t: TranslateFunction;
}
 const {{camelT PAGE.name}} = ({ t }: {{camelT PAGE.name}}Props) => (
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
      {{#each PAGE.files as |FILE|}}
      {{{file FILE}}}
      {{/each}}
    </div>
  </PageLayout>
);

export default translate('{{PAGE.name}}')({{camelT PAGE.name}});
{{/with}}
