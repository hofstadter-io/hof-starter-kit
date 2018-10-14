import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import translate from '../../../i18n';
import RegisterForm from '../components/RegisterForm';
import { PageLayout } from '../../layout/page';
import { Container } from '../../common/components/web';

import settings from '../../../../../../settings';

const PageStyled = styled.div`
{{#each DslContext.builtin-pages as |PAGE|}}
{{#if (eq PAGE.name "register")}}{{{file PAGE.style}}}{{/if}}{{/each}}
`

class RegisterView extends React.PureComponent {
  static propTypes = {
    register: PropTypes.func.isRequired,
    t: PropTypes.func
  };

  onSubmit = async values => {
    const { register, t } = this.props;
    const { errors } = await register(values);

    if (errors && errors.length) {
      throw errors.reduce(
        (res, error) => {
          res[error.field] = error.message;
          return res;
        },
        { _error: t('reg.errorMsg') }
      );
    }
  };

  renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${t('reg.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('reg.meta')}`
        }
      ]}
    />
  );

  render() {
    const { t } = this.props;
    return (
      <PageLayout>
        {this.renderMetaData(t)}
        <PageStyled>
          <div id="register-page">
            <Container>
              <h1 className="text-center">{t('reg.form.title')}</h1>
              <RegisterForm onSubmit={this.onSubmit} />
            </Container>
          </div>
        </PageStyled>
      </PageLayout>
    );
  }
}

export default translate('user')(RegisterView);
