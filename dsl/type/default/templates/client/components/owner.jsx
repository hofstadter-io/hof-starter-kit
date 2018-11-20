{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}
{{#with TYPE.pages.view as |VIEW|}}
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as RS from 'reactstrap'

import settings from '../../../../../../../settings';
import { PageLayout } from '../../../layout/page';
import translate, { TranslateFunction } from '../../../../i18n';

{{#each TYPE.components as |COMPONENT|}}
import {{COMPONENT.name}} from './{{COMPONENT.name}}';
{{/each}}

{{#each VIEW.imports as |IMPORT|}}
import {{#if IMPORT.default}}{{IMPORT.default}}{{/if ~}}
{{#if IMPORT.nested ~}}
{{#if IMPORT.default}}, {{/if ~}}
  { {{#each IMPORT.nested}}{{.}}{{#unless @last}}, {{/unless}}{{/each}} }{{/if}} from '{{IMPORT.library}}';
{{/each}}

const PageStyled = styled.div`
{{{file VIEW.style}}}
`

const {{TypeName}}View = (props) => {
  let { loading, {{typeName}}, {{typeName}}Delete, currentUser, match, location, t } = props;
  let {{typeName}}Obj = {{typeName}};
  if ({{typeName}} && {{typeName}}.{{typeName}}) {
    {{typeName}} = {{typeName}}.{{typeName}}
  }

  console.log("PROOOOPS", props);

  // console.log("RENDER", currentUser, {{typeName}}, {{typeName}}Obj);
  // if new {{typeName}} was just added read it from router
  if (!{{typeName}}Obj && location.state) {
    {{typeName}}Obj = location.state.{{typeName}};
  }

  const renderMetaData = () => {

    var title = {{typeName}} ? {{typeName}}.title : '???'
    return (
      <Helmet
        title={`${settings.app.name} - ${title}`}
        meta={[
          {
            name: 'description',
            content: t('{{typeName}}.meta')
          }
        ]}
      />
    );
  }

  if (loading && !{{typeName}}Obj) {
    console.log("RENDER 2", currentUser, {{typeName}}, {{typeName}}Obj);

    // console.log("{{typeName}} RENDER", loading, {{typeName}}, {{typeName}}Obj)
    return (
      <PageLayout>
        {renderMetaData()}
        <PageStyled>
          <div id="{{typeName}}View">
            <div id="{{typeName}}Loading" className="text-center">{t('{{typeName}}.loadMsg')}</div>
          </div>
        </PageStyled>
      </PageLayout>
    );
  } else {
    // console.log("{{typeName}} RENDER", loading, {{typeName}}, {{typeName}}Obj)
    return (
      <PageLayout>
        {renderMetaData()}
        <PageStyled>
          <div id="{{typeName}}View">

            {{#if TYPE.pages.view.custom}}

              {{#each TYPE.pages.view.files as |FILE|}}
              {{{file FILE}}}
              {{/each}}

            {{else}}

            <Link id="back-button" to="{{TYPE.pages.list.route}}">
              {t('{{typeName}}.btn.back')}
            </Link>
            <h2>
              {t(`{{typeName}}.label.view`)} {t('{{typeName}}.label.{{typeName}}')}
            </h2>

            <pre>{ JSON.stringify({{typeName}}) }</pre>

            {{/if}}

          </div>
        </PageStyled>

      </PageLayout>
    );
  }
};

{{TypeName}}View.propTypes = {
  loading: PropTypes.bool.isRequired,
  {{typeName}}: PropTypes.object,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate('{{MOD_NAME}}')({{TypeName}}View);
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
