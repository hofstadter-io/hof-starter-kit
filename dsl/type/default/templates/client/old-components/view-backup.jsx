{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}
import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import * as RS from 'reactstrap'
import settings from '../../../../../../../settings';

import { PageLayout } from '../../../layout/page';
import translate, { TranslateFunction } from '../../../../i18n';

const PageStyled = styled.div`
{{{file TYPE.pages.view.style}}}
`

interface {{camelT PAGE.name}}Props {
  t: TranslateFunction;
}
 const {{camelT TYPE.name}} = ({ t }: {{camelT TYPE.name}}Props) => (
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
    <PageStyled>
      {{#if TYPE.pages.view.custom}}
      {{#each TYPE.pages.view.files as |FILE|}}
      {{{file FILE}}}
      {{/each}}
      {{else}}
      <RS.Container>
        <h3>
          {t('view.welcome')} {t('view.pagename')}
        </h3>
      </RS.Container>
      {{/if}}
    </PageStyled>
  </PageLayout>
);

export default translate('{{MOD_NAME}}')({{camelT TYPE.name}});
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
