{{#with DslContext as |MODULE|}}
{{#with RepeatedContext as |COMPONENT|}}
{{#with (camelT COMPONENT.name) as |ComponentName|}}
{{#with (camel  COMPONENT.name) as |componentName|}}

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as RS from 'reactstrap'

import settings from '../../../../../../settings';
import { PageLayout } from '../../layout/page';
import translate, { TranslateFunction } from '../../../i18n';

import ComponentStyle from './{{ComponentName}}.scss';

// TODO Pagenation should be conditionally included, also...
//      there are possible multiple data paginations AND synchronizations
import { Pagination } from '../../common/components/web';
import paginationConfig from '../../../../../../config/pagination';
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
import {{COMPONENT.name}} from '../../../{{replace (trimprefix COMPONENT.component "type.") "." "/" -1}}';
{{else if (eq "module" (trimfrom_first COMPONENT.component "." false))}}
import {{COMPONENT.name}} from '../../../{{replace (trimprefix COMPONENT.component "module.") "." "/" -1}}';
{{else}}
// unknown COMPONENT class '{{COMPONENT.component}}'
{{/if}}
{{/each}}

const ComponentStyled = styled.div`${ComponentStyle}`

class {{ComponentName}}Component extends React.Component {
  static propTypes = {
    {{> common/default/client/common/prop-types.js THING=COMPONENT }}
  };

  {{#each COMPONENT.content as |CONTENT_FILE|}}
  {{{file CONTENT_FILE}}}
  {{/each}}
};

{{#if MODULE.translations}}
export default translate('{{MODULE.name}}')({{ComponentName}}Component);
{{else}}
export default {{ComponentName}}Component;
{{/if}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}

