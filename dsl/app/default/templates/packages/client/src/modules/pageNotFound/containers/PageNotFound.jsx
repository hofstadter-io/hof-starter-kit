import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import translate from '../../../i18n';
import { PageLayout } from '../../layout/page';
import { Button, Container } from '../../common/components/web';

import settings from '../../../../../../settings';

const PageStyled = styled.div`
{{#each DslContext.builtin-pages as |PAGE|}}
{{#if (eq PAGE.name "not-found")}}{{{file PAGE.style}}}{{/if}}{{/each}}
`
const PageNotFound = ({ staticContext = {}, t }) => {
  staticContext.pageNotFound = true;
  return (
    <PageLayout>
      <Helmet
        title={`${settings.app.name} - ${t('title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('meta')}`
          }
        ]}
      />
      <PageStyled>
        <div id="not-found-page">
          <Container>
            <h2>{t('content')} - 404</h2>
            <Link to="/">
              <Button className="home-link" color="primary">
                {t('btnHome')}
              </Button>
            </Link>
          </Container>
        </div>
      </PageStyled>
    </PageLayout>
  );
};

PageNotFound.propTypes = {
  staticContext: PropTypes.object,
  t: PropTypes.func
};

export default translate('notFound')(PageNotFound);
