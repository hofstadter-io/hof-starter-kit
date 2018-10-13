import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { LayoutCenter } from '../../common/components';
import { PageLayout } from '../../layout/page';
import ContactForm from './ContactForm';
import settings from '../../../../../../settings';

const PageStyled = styled.div`
{{#each DslContext.builtin-pages as |PAGE|}}
{{#if (eq PAGE.name "contact")}}{{{file PAGE.style}}}{{/if}}{{/each}}
`
const ContactView = props => {
  const { t } = props;

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <PageStyled>
        <div id="contact-page">
          <LayoutCenter>
            <h1 className="text-center">{t('form.title')}</h1>
            <ContactForm {...props} />
          </LayoutCenter>
        </div>
      </PageStyled>
    </PageLayout>
  );
};

ContactView.propTypes = {
  t: PropTypes.func
};

export default ContactView;
