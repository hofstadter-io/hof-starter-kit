import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { isEmpty } from 'lodash';

import translate from '../../../i18n';
import Field from '../../../utils/FieldAdapter';
import { Form, RenderField, RenderSelect, RenderCheckBox, Option, Button, Alert } from '../../common/components/web';
import { email, minLength, required, match, validateForm } from '../../../../../common/validation';

import settings from '../../../../../../settings';

const userFormSchema = {
  username: [required, minLength(3)],
  email: [required, email]
};

const createUserFormSchema = {
  ...userFormSchema,
  password: [required, minLength(8)],
  passwordConfirmation: [required, match('password'), minLength(8)]
};

const updateUserFormSchema = {
  ...userFormSchema,
  password: minLength(8),
  passwordConfirmation: [match('password'), minLength(8)]
};

const validate = (values, createNew) => validateForm(values, createNew ? createUserFormSchema : updateUserFormSchema);

const UserForm = (props) => {
  console.log("UserForm", props)
  const { values, handleSubmit, error, setFieldValue, t, shouldDisplayRole, shouldDisplayActive } = props;
  const { username, email, role, isActive, apikey, profile, auth, password, passwordConfirmation } = values;

  return (
    <Form name="user" onSubmit={handleSubmit}>
      <Field
        name="username"
        component={RenderField}
        type="text"
        label={t('userEdit.form.field.name')}
        value={username}
      />
      <Field name="email" component={RenderField} type="email" label={t('userEdit.form.field.email')} value={email} />
      {shouldDisplayRole && (
        <Field
          name="role"
          component={RenderSelect}
          type="select"
          label={t('userEdit.form.field.role.label')}
          value={role}
        >
          <Option value="user">{t('userEdit.form.field.role.user')}</Option>
          <Option value="admin">{t('userEdit.form.field.role.admin')}</Option>
        </Field>
      )}
      {shouldDisplayActive && (
        <Field
          name="isActive"
          component={RenderCheckBox}
          type="checkbox"
          label={t('userEdit.form.field.active')}
          checked={isActive}
        />
      )}
      {{#each DslContext.user.profile.fields as |FIELD|}}
      <Field
        name="{{camel FIELD.name}}"
        component={RenderField}
        type="text"
        {{#if (eq FIELD.type "string")}}
        type="text"
        {{else if (eq FIELD.type "text")}}
        type="text"
        {{else if (eq FIELD.type "json")}}
        type="textarea"
        {{else if (eq FIELD.type "boolean")}}
        type="checkbox"
        {{else if (eq FIELD.type "integer")}}
        type="number"
        {{else if (eq FIELD.type "decimal")}}
        type="number"
        {{else if (eq FIELD.type "date")}}
        type="date"
        {{else if (eq FIELD.type "time")}}
        type="time"
        {{else if (eq FIELD.type "datetime")}}
        type="datetime"
        {{/if}}
        label={t('userEdit.form.field.{{camel FIELD.name}}')}
        value={ profile.{{camel FIELD.name}} }
        onChange={value => setFieldValue('profile', { ...profile, {{camel FIELD.name}}: value })}
      />
      {{/each}}

      {settings.user.auth.apikey.enabled && (
        <div className="d-flex flex-row justify-content-between">
          <p>API Key: {props.currentApikey}</p>
          <Button
            className="btn btn-warning btn-sm"
            onClick={async () => {
              console.log("REGEN !!!", props)
              props.generateApikey(props.initialValues.id).then((result) => {
                console.log("REGEN result", result, props)
              });
            }}
          >Regenerate</Button>
        </div>
      )}
      {settings.user.auth.certificate.enabled && (
        <Field
          name="serial"
          component={RenderField}
          type="text"
          label={t('userEdit.form.field.serial')}
          value={auth && auth.certificate && auth.certificate.serial}
          onChange={value => setFieldValue('auth', { ...auth, certificate: { ...auth.certificate, serial: value } })}
        />
      )}
      <Field
        name="password"
        component={RenderField}
        type="password"
        label={t('userEdit.form.field.pass')}
        value={password}
      />
      <Field
        name="passwordConfirmation"
        component={RenderField}
        type="password"
        label={t('userEdit.form.field.passConf')}
        value={passwordConfirmation}
      />
      {error && <Alert color="error">{error}</Alert>}
      <Button color="primary" type="submit">
        {t('userEdit.form.btnSubmit')}
      </Button>
    </Form>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  onSubmit: PropTypes.func,
  setTouched: PropTypes.func,
  isValid: PropTypes.bool,
  shouldDisplayRole: PropTypes.bool,
  shouldDisplayActive: PropTypes.bool,
  error: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
  touched: PropTypes.object,
  t: PropTypes.func
};

const UserFormWithFormik = withFormik({
  mapPropsToValues: values => {
    console.log("FORMIK", values)
    const { id, username, email, role, isActive, profile } = values.initialValues;
    return {
      id: id,
      username: username,
      email: email,
      role: role || 'user',
      isActive: isActive,
      password: '',
      passwordConfirmation: '',
      profile: profile || {},
      auth: {
        ...values.initialValues.auth
      }
    };
  },
  async handleSubmit(
    values,
    {
      setErrors,
      props: { onSubmit }
    }
  ) {
    await onSubmit(values).catch(e => setErrors(e));
  },
  displayName: 'SignUpForm ', // helps with React DevTools
  validate: (values, props) => validate(values, isEmpty(props.initialValues))
});

export default translate('user')(UserFormWithFormik(UserForm));
