{{#with RepeatedContext as |PAGE|}}
import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import * as RS from 'reactstrap'
import settings from '../../../../../../../settings';

import { PageLayout } from '../../../layout/page';
import translate, { TranslateFunction } from '../../../../i18n';

{{#each PAGE.imports as |IMPORT|}}
import {{#if IMPORT.default}}{{IMPORT.default}}{{/if ~}}
{{#if IMPORT.nested ~}}
{{#if IMPORT.default}}, {{/if ~}}
  { {{#each IMPORT.nested}}{{.}}{{#unless @last}}, {{/unless}}{{/each}} }{{/if}} from '{{IMPORT.library}}';
{{/each}}

const PageStyled = styled.div`
{{{file PAGE.style}}}
`

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
    <PageStyled>
      {{#each PAGE.files as |FILE|}}
      {{{file FILE}}}
      {{/each}}
    </PageStyled>
  </PageLayout>
);

export default translate('{{PAGE.name}}')({{camelT PAGE.name}});
{{/with}}
