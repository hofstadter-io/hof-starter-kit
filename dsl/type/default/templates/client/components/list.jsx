{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as RS from 'reactstrap'

{{#each TYPE.pages.list.imports as |IMPORT|}}
import {{#if IMPORT.default}}{{IMPORT.default}}{{/if ~}}
{{#if IMPORT.nested ~}}
{{#if IMPORT.default}}, {{/if ~}}
{ {{#each IMPORT.nested}}{{.}}{{#unless @last}}, {{/unless}}{{/each}} } from '{{IMPORT.library}}';
{{/if}}
{{/each}}

// TODO Custom Imports
import { format, distanceInWords, formatRelative, subDays  } from 'date-fns'

import { Table, Button, Pagination } from '../../../common/components/web';
import settings from '../../../../../../../settings';
import { PageLayout } from '../../../layout/page';
import translate, { TranslateFunction } from '../../../../i18n';
import paginationConfig from '../../../../../../../config/pagination';

const { itemsNumber, type } = paginationConfig.web;

const PageStyled = styled.div`
{{{file TYPE.pages.list.style}}}
`

class {{TypeName}}List extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    {{typeName}}s: PropTypes.array,
    // deletePost: PropTypes.func.isRequired,
    // loadData: PropTypes.func,
    t: PropTypes.func
  };

  handleDeletePost = id => {
  /*
    const { deletePost } = this.props;
    deletePost(id);
  */
  };

  handlePageChange = (pagination, pageNumber) => {
  /*
    const {
      {{typeName}}s: {
        pageInfo: { endCursor }
      },
      loadData
    } = this.props;

    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  */
  };

  render() {
    const { loading, {{typeName}}s, t } = this.props;
    // console.log("LIST RENDER", loading, {{typeName}}s)
    const Loading = () => <div className="text-center">{t('{{typeName}}.loadMsg')}</div>;
    const No{{TypeName}}sMessage = () => <div className="text-center">{t('{{typeName}}.no{{TypeName}}sMsg')}</div>;
    const Render{{TypeName}}s = ({ {{typeName}}s }) => (
      <div>
        <pre>"{ {{typeName}}s.length }" {{typeName}}s should go here</pre>
        <RS.Container>
          <RS.Row>
            { {{typeName}}s.map( elem => (
                <RS.Col lg="8" sm="12" key="{elem.id}">
                  <p>
                    <b><Link to={"{{typeName}}/" + elem.id}>{{typeName}} {elem.id}</Link></b>
                    <p>{ JSON.stringify(elem) }</p>
                  </p>
                </RS.Col>
              )
            )}
          </RS.Row>
        </RS.Container>
      </div>
    );

    return (
      <PageLayout>
        {/* Render metadata */}
        <Helmet
          title={`${settings.app.name} - ${t('list.title')}`}
          meta={[{ name: 'description', content: `${settings.app.name} - ${t('list.meta')}` }]}
        />
        <PageStyled>
          <div id="{{typeName}}View">

            {{#if TYPE.pages.list.custom}}

              {{#each TYPE.pages.list.files as |FILE|}}
              {{{file FILE}}}
              {{/each}}

            {{else}}

          <h2>{t('list.subTitle')}</h2>
          <Link to="{{TYPE.pages.create.route}}">
            <Button color="primary">{t('list.btn.add')}</Button>
          </Link>
          {/* Render loader */}
          {loading && !{{typeName}}s && <Loading />}
          {/* Render main post content */}
          { {{typeName}}s  ? <Render{{TypeName}}s {{typeName}}s={ {{typeName}}s }/> : <No{{TypeName}}sMessage />}

          {{/if}}
          </div>
        </PageStyled>
      </PageLayout>
    );
  }
}

export default translate('{{MOD_NAME}}')({{TypeName}}List);
{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
