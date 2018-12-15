import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import translate from '../../../i18n';
// import SubscriptionProfile from '../../subscription/containers/SubscriptionProfile';
import { Container, Card, CardGroup, CardTitle, CardText, Button } from '../../common/components/web';
import { PageLayout } from '../../layout/page';

import settings from '../../../../../../settings';

const PageStyled = styled.div`
{{#each DslContext.builtin-pages as |PAGE|}}
{{#if (eq PAGE.name "profile")}}{{{file PAGE.style}}}{{/if}}{{/each}}
`

const renderMetaData = t => {
  return (
    <Helmet
      title={`${settings.app.name} - ${t('profile.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('profile.meta')}`
        }
      ]}
    />
  );
};

const ProfileView = (props) => {
  let { currentUserLoading, currentUser, generateApikey, t } = props;
  if (currentUserLoading && !currentUser) {
    return (
      <PageLayout>
        {renderMetaData(t)}
        <PageStyled>
          <div id="profile-page">
            <div className="text-center">{t('profile.loadMsg')}</div>
          </div>
        </PageStyled>
      </PageLayout>
    );
  } else if (currentUser) {
    console.log("PROFILE", props)
    console.log("CURRENT USER", currentUser, generateApikey)
    return (
      <PageLayout>
        {renderMetaData(t)}
        <PageStyled>
          <div id="profile-page">
            <Container>
              <h1 className="text-center">{t('profile.card.title')}</h1>
              <Card>
                <CardGroup>
                  <CardTitle>{t('profile.card.group.name')}:</CardTitle>
                  <CardText>{currentUser.username}</CardText>
                </CardGroup>
                <CardGroup>
                  <CardTitle>{t('profile.card.group.email')}:</CardTitle>
                  <CardText>{currentUser.email}</CardText>
                </CardGroup>
                <CardGroup>
                  <CardTitle>{t('profile.card.group.role')}:</CardTitle>
                  <CardText>{currentUser.role}</CardText>
                </CardGroup>
                {currentUser.profile &&
                  currentUser.profile.fullName && (
                    <CardGroup>
                      <CardTitle>{t('profile.card.group.full')}:</CardTitle>
                      <CardText>{currentUser.profile.fullName}</CardText>
                    </CardGroup>
                  )}
                <CardGroup>
                  <CardTitle>{t('profile.card.group.apikey')}:</CardTitle>
                  <CardText>
                    {currentUser.auth && currentUser.auth.apikey && currentUser.auth.apikey.apikey !== null
                      ?
                        <b>{currentUser.auth.apikey.apikey}</b>
                      :
                        <Button
                          className="btn btn-success btn-sm"
                          onClick={() => props.generateApikey(currentUser.id)}
                        >Generate</Button>
                    }
                  </CardText>
                </CardGroup>
              </Card>
              <Link
                className="mt-2 btn user-link"
                to={ { pathname: `/users/${currentUser.id}`, state: { from: 'profile' } } }
              >
                {t('profile.editProfileText')}
              </Link>
            </Container>
          </div>
        </PageStyled>
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        {renderMetaData(t)}
        <PageStyled>
          <div id="profile-page">
            <h2>{t('profile.errorMsg')}</h2>
          </div>
        </PageStyled>
      </PageLayout>
    );
  }
};

ProfileView.propTypes = {
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  generateApikey: PropTypes.func,
  t: PropTypes.func
};

export default translate('user')(ProfileView);
