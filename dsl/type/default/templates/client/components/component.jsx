{{#with DslContext as |TYPE|}}
{{#getdsl (replace TYPE.relPath "/" "." -1) true}}{{#with . as |MODULE| }}
{{#getdsl "app" true}}{{#with . as |APP| }}

{{#with RepeatedContext as |COMPONENT|}}
{{#with (camelT COMPONENT.name) as |ComponentName|}}
{{#with (camel  COMPONENT.name) as |componentName|}}

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
{{#each COMPONENT.imports as |IMPORT|}}
import {{#if IMPORT.default}}{{IMPORT.default}}{{/if ~}}
{{#if IMPORT.nested ~}}
{{#if IMPORT.default}}, {{/if ~}}
{ {{#each IMPORT.nested}}{{.}}{{#unless @last}}, {{/unless}}{{/each}} } {{! ~}}
{{/if}}
 from '{{IMPORT.library}}';
{{/each}}

{{#each COMPONENT.components as |COMPONENT|}}
{{#if (eq "type" (trimfrom_first COMPONENT.component "." false))}}
import {{camelT COMPONENT.name}} from '../../../../{{replace (trimprefix COMPONENT.component "type.") "." "/" -1}}';
{{else if (eq "module" (trimfrom_first COMPONENT.component "." false))}}
import {{camelT COMPONENT.name}} from '../../../../{{replace (trimprefix COMPONENT.component "module.") "." "/" -1}}';
{{else}}
// unknown COMPONENT class '{{COMPONENT.component}}'
{{/if}}
{{/each}}

const ComponentStyled = styled.div`
{{#each COMPONENT.style as |STYLE_FILE|}}
{{{file STYLE_FILE}}}
{{/each}}
`

class {{ComponentName}}Component extends React.Component {
  static propTypes = {
    {{> common/default/client/common/prop-types.js THING=COMPONENT }}
  };

  {{#if COMPONENT.content}}
  {{#if COMPONENT.content.default}}
  {{> (concat3 "type/default/client/components/defaults/content/" COMPONENT.name ".jsx") THING=COMPONENT }}
  {{else}}
  {{#each COMPONENT.content as |CONTENT_FILE|}}
  {{{file CONTENT_FILE}}}
  {{/each}}
  {{/if}}

  {{else}}
  {{> (concat3 "type/default/client/components/defaults/content/" COMPONENT.name ".jsx") THING=COMPONENT }}
  {{/if}}
};

{{#if TYPE.translations}}
export default translate('{{TYPE.name}}')({{ComponentName}}Component);
{{else}}
export default {{ComponentName}}Component;
{{/if}}
{{/with}}
{{/with}}
{{/with}}

{{/with}}{{/getdsl}}
{{/with}}{{/getdsl}}
{{/with}}

