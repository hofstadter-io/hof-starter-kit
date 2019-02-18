import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { compose } from 'react-apollo';

import { PageLayout } from '../../layout/page';
import { Container, Row, Col } from '../../common/components/web';

import settings from '../../../../../../settings';
import translate from '../../../i18n';
import UsersFilterView from '../components/UsersFilterView';
import { Button } from '../../common/components/web';
import UsersListView from '../components/UsersListView';
import withSubscription from './withSubscription';
import {
  withFilterUpdating,
  withOrderByUpdating,
  withUsers,
  withUsersDeleting,
  withUsersState,
  updateUsersState
} from './UserOperations';

const PageStyled = styled.div`
{{#each DslContext.builtin-pages as |PAGE|}}
{{#if (eq PAGE.name "user-list")}}{{{file PAGE.style}}}{{/if}}{{/each}}
`

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const { usersUpdated, updateQuery } = this.props;
    if (usersUpdated) {
      updateUsersState(usersUpdated, updateQuery);
    }
  }

  renderMetaData() {
    return (
      <Helmet
        title={`${settings.app.name} - ${this.props.t('users.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${this.props.t('users.meta')}`
          }
        ]}
      />
    );
  }

  render() {
    console.log("USERS - props", this.props)
    return (
      <PageLayout>
        {this.renderMetaData()}
        <PageStyled>
          <div id="user-list-page">
            <Container>
              <Row style={ {paddingTop: '0.5em'} }>
                <Col>
                  <h2>
                    {this.props.t('users.list.title')}
                  </h2>
                </Col>
                <Col xs="4">
                  <Link to="/users/new">
                    <Button color="primary">{this.props.t('users.btn.add')}</Button>
                  </Link>
                </Col>
              </Row>
              <hr />
              <UsersFilterView {...this.props} />
              <hr />
              <div style={ {overflowY: 'auto'} }>
                <UsersListView {...this.props} />
              </div>
            </Container>
          </div>
        </PageStyled>
      </PageLayout>
    );
  }
}

Users.propTypes = {
  usersUpdated: PropTypes.object,
  updateQuery: PropTypes.func,
  t: PropTypes.func
};

export default compose(
  withUsersState,
  withUsers,
  withUsersDeleting,
  withOrderByUpdating,
  withFilterUpdating,
  withSubscription
)(translate('user')(Users));
