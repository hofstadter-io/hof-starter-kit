import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import translate from '../../../i18n';
import { LayoutCenter } from '../../common/components';
import { Card, CardGroup, CardTitle, CardText } from '../../common/components/web';
import { PageLayout } from '../../layout/page';

import LoginForm from './LoginForm';
import settings from '../../../../../../settings';

const PageStyled = styled.div`
{{#each DslContext.builtin-pages as |PAGE|}}
{{#if (eq PAGE.name "login")}}{{{file PAGE.style}}}{{/if}}{{/each}}
`

class LoginView extends React.PureComponent {
  static propTypes = {
    error: PropTypes.string,
    login: PropTypes.func.isRequired,
    t: PropTypes.func
  };

  onSubmit = login => async values => {
    const res = await login(values);
    const { errors } = res;
    const { t } = this.props;

    if (errors && errors.length) {
      throw errors.reduce(
        (res, error) => {
          res[error.field] = error.message;
          return res;
        },
        { _error: t('login.errorMsg') }
      );
    }
  };

  render() {
    const { login, t } = this.props;

    const renderMetaData = () => (
      <Helmet
        title={`${settings.app.name} - ${t('login.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('login.meta')}`
          }
        ]}
      />
    );

    return (
      <PageLayout>
        {renderMetaData()}
        <PageStyled>
          <div id="login-page">
            <LayoutCenter>
              <h1 className="text-center">{t('login.form.title')}</h1>
              <LoginForm onSubmit={this.onSubmit(login)} />
            </LayoutCenter>
          </div>
        </PageStyled>
      </PageLayout>
    );
  }
}

export default translate('user')(LoginView);
