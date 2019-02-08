{{#with DslContext as |TYPE|}}
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

// TODO Pagenation should be conditionally included, also...
//      there are possible multiple data paginations AND synchronizations
import { Pagination } from '../../../common/components/web';
import paginationConfig from '../../../../../../../config/pagination';
const { itemsNumber, type } = paginationConfig.web;

// Custom Imports
{{#each PAGE.imports as |IMPORT|}}
import {{#if IMPORT.default}}{{IMPORT.default}}{{/if ~}}
{{#if IMPORT.nested ~}}
{{#if IMPORT.default}}, {{/if ~}}
{ {{#each IMPORT.nested}}{{.}}{{#unless @last}}, {{/unless}}{{/each}} } {{! ~}}
{{/if}}
 from '{{IMPORT.library}}';
{{/each}}

{{#each PAGE.components as |COMPONENT|}}
{{#if (eq "type" (trimfrom_first COMPONENT.component "." false))}}
import {{COMPONENT.name}} from '../../../../{{replace (trimprefix COMPONENT.component "type.") "." "/" -1}}';
{{else if (eq "module" (trimfrom_first COMPONENT.component "." false))}}
import {{COMPONENT.name}} from '../../../../{{replace (trimprefix COMPONENT.component "module.") "." "/" -1}}';
{{else}}
// unknown COMPONENT class '{{COMPONENT.component}}'
{{/if}}
{{/each}}

const PageStyled = styled.div`
{{#each PAGE.style as |STYLE_FILE|}}
{{{file STYLE_FILE}}}
{{/each}}
`

class {{PageName}}Component extends React.Component {
  static propTypes = {
    {{> client/common/prop-types.js THING=PAGE }}
  };

  {{#each PAGE.content as |CONTENT_FILE|}}
  {{{file CONTENT_FILE}}}
  {{/each}}
};

{{#if TYPE.translations}}
export default translate('{{TYPE.name}}')({{PageName}}Component);
{{else}}
export default {{PageName}}Component;
{{/if}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}

