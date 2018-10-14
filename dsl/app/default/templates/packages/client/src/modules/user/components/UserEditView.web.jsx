import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../layout/page';
import { Container, Row, Col } from '../../common/components/web';

import UserForm from './UserForm';
import settings from '../../../../../../settings';
import translate from '../../../i18n';

const PageStyled = styled.div`
{{#each DslContext.builtin-pages as |PAGE|}}
{{#if (eq PAGE.name "user-edit")}}{{{file PAGE.style}}}{{/if}}{{/each}}
`

class UserEditView extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    currentUser: PropTypes.object,
    errors: PropTypes.array,
    history: PropTypes.object,
    t: PropTypes.func,
    editUser: PropTypes.func.isRequired,
    onSubmit: PropTypes.func
  };

  state = {};

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.loading && nextProps.errors && nextProps.errors.length) {
      nextProps.history.push('/profile');
    }
    return null;
  }

  renderMetaData = t => (
    <Helmet
      title={`${settings.app.name} - ${t('userEdit.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('userEdit.meta')}`
        }
      ]}
    />
  );

  render() {
    const { loading, user, t, currentUser } = this.props;

    if (loading && !user) {
      return (
        <PageLayout>
          {this.renderMetaData(t)}
          <PageStyled>
            <div id="user-edit-page">
              <div className="text-center">{t('userEdit.loadMsg')}</div>
            </div>
          </PageStyled>
        </PageLayout>
      );
    } else {
      const isNotSelf = !user || (user && user.id !== currentUser.id);
      return (
        <PageLayout>
          {this.renderMetaData(t)}
          <PageStyled>
            <div id="user-edit-page">
            <Container>
              <Row style={ {paddingTop: '0.5em'} }>
                <Col>
                  <h2>
                    {t('userEdit.form.titleEdit')} {t('userEdit.form.title')}
                  </h2>
                </Col>
                <Col xs="3">
                  <Link id="back-button" to={user && user.role === 'admin' ? '/users' : '/profile'}>
                    Back
                  </Link>
                </Col>
              </Row>
              <UserForm
                onSubmit={this.props.onSubmit}
                shouldDisplayRole={isNotSelf}
                shouldDisplayActive={isNotSelf}
                initialValues={user}
              />
              <br />
              <br />
            </Container>
            </div>
          </PageStyled>
        </PageLayout>
      );
    }
  }
}

export default translate('user')(UserEditView);
