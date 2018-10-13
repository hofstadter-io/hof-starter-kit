import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import translate from '../../../i18n';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { PageLayout } from '../../layout/page';

import settings from '../../../../../../settings';

const PageStyled = styled.div`
{{#each DslContext.builtin-pages as |PAGE|}}
{{#if (eq PAGE.name "reset-password")}}{{{file PAGE.style}}}{{/if}}{{/each}}
`

class ResetPasswordView extends React.Component {
  static propTypes = {
    resetPassword: PropTypes.func.isRequired,
    t: PropTypes.func,
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  onSubmit = resetPassword => async values => {
    const { errors } = await resetPassword({
      ...values,
      token: this.props.match.params.token
    });
    const { t } = this.props;

    if (errors && errors.length) {
      throw errors.reduce(
        (res, error) => {
          res[error.field] = error.message;
          return res;
        },
        { _error: t('resetPass.errorMsg') }
      );
    }
  };

  render() {
    const { resetPassword, t } = this.props;

    const renderMetaData = () => (
      <Helmet
        title={`${settings.app.name} - ${t('resetPass.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('resetPass.meta')}`
          }
        ]}
      />
    );

    return (
      <PageLayout>
        {renderMetaData()}
        <PageStyled>
          <div id="reset-password-page">
            <h1>{t('resetPass.form.title')}</h1>
            <ResetPasswordForm onSubmit={this.onSubmit(resetPassword)} />
          </div>
        </PageStyled>
      </PageLayout>
    );
  }
}

export default translate('user')(ResetPasswordView);
