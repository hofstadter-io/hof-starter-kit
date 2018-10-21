{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as RS from 'reactstrap'

import settings from '../../../../../../../settings';
import { PageLayout } from '../../../layout/page';
import translate, { TranslateFunction } from '../../../../i18n';

import {{TypeName}}Form from './form';

const onSubmit = ({{typeName}}Create) => values => {
  console.log("create - on Submit", {{typeName}}, values)
  {{typeName}}Create(values);
};

const {{TypeName}}Create = ({ loading, {{typeName}}, {{typeName}}Create, currentUser, match, location, t }) => {
  let {{typeName}}Obj = {{typeName}};
  if ({{typeName}} && {{typeName}}.{{typeName}}) {
    {{typeName}} = {{typeName}}.{{typeName}}
  }
  console.log("Create RENDER", currentUser, {{typeName}}, {{typeName}}Obj);
  // if new {{typeName}} was just added read it from router
  if (!{{typeName}}Obj && location.state) {
    {{typeName}}Obj = location.state.{{typeName}};
  }

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('{{typeName}}.title')}`}
      meta={[
        {
          name: 'description',
          content: t('{{typeName}}.meta')
        }
      ]}
    />
  );

  if (loading && !{{typeName}}Obj) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center">{t('{{typeName}}.loadMsg')}</div>
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        {renderMetaData()}
        <Link id="back-button" to="{{TYPE.pages.list.route}}">
          {t('{{typeName}}.btn.back')}
        </Link>
        <h2>
          {t(`{{typeName}}.label.create`)} {t('{{typeName}}.label.{{typeName}}')}
        </h2>
        <{{TypeName}}Form onSubmit={onSubmit({{typeName}}Create)} {{typeName}}={ {{typeName}} } />
        <br />
      </PageLayout>
    );
  }
};

{{TypeName}}Create.propTypes = {
  loading: PropTypes.bool.isRequired,
  {{typeName}}: PropTypes.object,
  {{typeName}}Create: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate('{{MOD_NAME}}')({{TypeName}}Create);

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
