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

import Field from '../../../utils/FieldAdapter';
import { Form, RenderField, Button } from '../../common/components/web';
import { required, validateForm } from '../../../../../common/validation';

const PageStyled = styled.div`
{{{file TYPE.pages.view.style}}}
`

const {{typeName}}FormSchema = {
{{#each TYPE.fields as |FIELD|}}
  {{camel FIELD.name}}: [required]{{#unless @last}},{{/unless}}
{{/each}}
};

const validate = values => validateForm(values, {{typeName}}FormSchema);

const {{TypeName}}Form = ({ values, handleSubmit, submitting, t }) => {
  return (
    <Form name="{{typeName}}" onSubmit={handleSubmit}>
    {{#each TYPE.fields as |FIELD|}}
      <Field
        name="{{camel FIELD.name}}"
        component={RenderField}
        type="text"
        label={t('{{typeName}}.field.{{camel FIELD.name}}')}
        value={ values.{{FIELD.name}} }
      />
    {{/each}}
      <Button color="primary" type="submit" disabled={submitting}>
        {t('post.btn.submit')}
      </Button>
    </Form>
  );
};

{{TypeName}}Form.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  {{typeName}}: PropTypes.object,
  t: PropTypes.func
};

const {{TypeName}}FormWithFormik = withFormik({
  mapPropsToValues: props => ({
    title: props.post && props.post.title,
    content: props.post && props.post.content
  }),
  validate: values => validate(values),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: 'PostForm' // helps with React DevTools
});

export default translate('post')(PostFormWithFormik(PostForm));

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
