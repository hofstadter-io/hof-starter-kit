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
{{#if (eq PAGE.name "user-add")}}{{{file PAGE.style}}}{{/if}}{{/each}}
`

class UserAddView extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object,
    errors: PropTypes.array,
    addUser: PropTypes.func.isRequired,
    history: PropTypes.object,
    t: PropTypes.func,
    onSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

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
    const { t } = this.props;

    return (
      <PageLayout>
        {this.renderMetaData(t)}
        <PageStyled>
          <div id="user-add-page">
            <Container>
              <Row style={ {paddingTop: '0.5em'} }>
                <Col>
                  <h2>
                    {t('userEdit.form.titleCreate')} {t('userEdit.form.title')}
                  </h2>
                </Col>
                <Col xs="3">
                  <Link id="back-button" to="/users">
                    Back
                  </Link>
                </Col>
              </Row>
              <UserForm
                onSubmit={this.props.onSubmit}
                initialValues={ {} }
                shouldDisplayRole={true}
                shouldDisplayActive={true}
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

export default translate('user')(UserAddView);
