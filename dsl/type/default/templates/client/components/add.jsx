{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import translate from '../../../i18n';
import { PageLayout } from '../../common/components/web';
import PostForm from './PostForm';

import settings from '../../../../../../settings';

const onSubmit = addPost => values => {
  addPost(values.title, values.content);
};

const PostAddView = ({ addPost, t }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('post.title')}`}
      meta={[
        {
          name: 'description',
          content: t('post.meta')
        }
      ]}
    />
  );
  return (
    <PageLayout>
      {renderMetaData()}
      <Link id="back-button" to="/posts">
        {t('post.btn.back')}
      </Link>
      <h2>
        {t(`post.label.create`)} {t('post.label.post')}
      </h2>
      <PostForm onSubmit={onSubmit(addPost)} />
      <br />
    </PageLayout>
  );
};

PostAddView.propTypes = {
  addPost: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('post')(PostAddView);
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
