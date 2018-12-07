{{#with DslContext as |MODULE|}}
{{#with RepeatedContext as |PAGE|}}
{{#with (camelT PAGE.name) as |PageName|}}
{{#with (camel  PAGE.name) as |pageName|}}

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as RS from 'reactstrap'

import settings from '../../../../../../../settings';
import { PageLayout } from '../../../layout/page';
import translate, { TranslateFunction } from '../../../../i18n';


{{#each PAGE.components as |COMPONENT|}}
{{#if (eq "type" (trimfrom_first COMPONENT.component "." false))}}
import {{COMPONENT.name}} from '../../../../{{replace (trimprefix COMPONENT.component "type.") "." "/" -1}}';
{{else if (eq "module" (trimfrom_first COMPONENT.component "." false))}}
import {{COMPONENT.name}} from '../../../../{{replace (trimprefix COMPONENT.component "module.") "." "/" -1}}';
{{else}}
// unknown COMPONENT class {{COMPONENT.component}}
{{/if}}
{{/each}}

const PageStyled = styled.div`
{{#each PAGE.style as |STYLE_FILE|}}
{{{file STYLE_FILE}}}
{{/each}}
`

const {{PageName}}Page = (props) => {
  console.log("{{PageName}} - props", props);

  let { t } = props;

  const renderMetaData = () => {

    var title = '{{PageName}}';
    return (
      <Helmet
        title={`${settings.app.name} - ${title}`}
        meta={[
          {
            name: 'description',
            content: t('{{pageName}}.meta')
          }
        ]}
      />
    );
  }

  console.log("{{PageName}} - render", props);

  return (
    <PageLayout>
      {renderMetaData()}
      <PageStyled>
        <div id="{{pageName}}Page">

          {{#each PAGE.content as |CONTENT_FILE|}}
          {{{file CONTENT_FILE}}}
          {{/each}}

        </div>
      </PageStyled>

    </PageLayout>
  );

};

{{PageName}}Page.propTypes = {

  {{#if PAGE.currentUser}}
  currentUser: PropTypes.object.isRequired,
  {{/if}}

  {{#each PAGE.data as |DATA|}}
  // loading{{camelT DATA.name}}: PropTypes.bool.isRequired,
  // {{camel DATA.name}}: PropTypes.object.isRequired,
  {{/each}}

  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate('{{MODULE.name}}')({{PageName}}Page);
{{/with}}
{{/with}}
{{/with}}
{{/with}}
