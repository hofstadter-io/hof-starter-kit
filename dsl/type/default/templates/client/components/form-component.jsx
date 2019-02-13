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

import { withFormik  } from 'formik';
import Field from '../../../../utils/FieldAdapter';
import { Form, RenderField, RenderSelect, RenderCheckBox, Button } from '../../../common/components/web';
import { required, validateForm } from '../../../../../../common/validation';

const PageStyled = styled.div`
{{{file TYPE.pages.form.style}}}
`

const {{typeName}}FormSchema = {
{{#each TYPE.fields as |FIELD|}}
  {{camel FIELD.name}}: [required],
{{/each}}
  {{#if TYPE.visibility.enabled}}
  {{#if TYPE.visibility.public}}
  {{TYPE.visibility.public}}: [],
  {{else}}
  isPublic: [],
  {{/if}}
  {{/if}}
};

const validate = values => validateForm(values, {{typeName}}FormSchema);

const {{TypeName}}Form = (props) => {
  console.log("{{TypeName}}Form - props", props)
  let { values, handleSubmit, submitting, t } = props;
  return (
    {{#if TYPE.pages.form.custom}}
      {{{file TYPE.pages.form.file}}}
    {{else}}
    <Form name="{{typeName}}" onSubmit={handleSubmit}>
      {{> client/components/form-fields.js}}
      <Button color="primary" type="submit" disabled={submitting}>
        {t('{{typeName}}.btn.submit')}
      </Button>
    </Form>
    {{/if}}
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
  mapPropsToValues: props => {
    return {
      {{#each TYPE.fields as |FIELD|}}
      {{camel FIELD.name}}: props.{{typeName}} && props.{{typeName}}.{{camel FIELD.name}},
      {{/each}}

      {{#if TYPE.visibility.enabled}}
      {{#if TYPE.visibility.public}}
      {{TYPE.visibility.public}}: props.{{typeName}} && props.{{typeName}}.{{TYPE.visibility.public}},
      {{else}}
      isPublic: props.{{typeName}} && props.{{typeName}}.isPublic,
      {{/if}}
      {{/if}}
    }

  },
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
  displayName: '{{TypeName}}Form' // helps with React DevTools
});

export default translate('{{MOD_NAME}}')({{TypeName}}FormWithFormik({{TypeName}}Form));

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
