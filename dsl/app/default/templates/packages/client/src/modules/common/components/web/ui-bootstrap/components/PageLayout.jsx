import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import * as RS from 'reactstrap'

import i18n from 'i18next';
import LanguagePicker from './LanguagePicker'

var HOF = {
  NavLink,
  LanguagePicker: () => (
    <RS.NavItem key="languagePicker" style={ { display: 'flex', alignItems: 'center' } }>
      <LanguagePicker i18n={i18n} />
    </RS.NavItem>
  ),
}

class PageLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
        <section className="d-flex flex-column flex-grow-1">

          <section className="d-flex flex-column flex-grow-1 flex-shrink-0">
            <section className="d-flex flex-column">
              <div id="content">
              {{{file DslContext.layout.navbar.file}}}
              </div>
            </section>
            {{{file DslContext.layout.center.file}}}
          </section>
          <section className="d-flex flex-column">
            {{{file DslContext.layout.footer.file}}}
          </section>
        </section>
    );
  }
}

/*
class PageLayout extends React.Component {
  render() {
    const { children, navBar } = this.props;
    return (
      <section className="d-flex flex-column flex-grow-1">
        <section className="d-flex flex-column flex-grow-1 flex-shrink-0">
          <section className="d-flex flex-column">{navBar !== false && <NavBar />}</section>
          <Container id="content">{children}</Container>
        </section>
        <Footer className="d-flex flex-shrink-0 justify-content-center">
          <span>&copy; 2018. {settings.app.name}.</span>
        </Footer>
      </section>
    );
  }
}
*/

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool
};

export default PageLayout;
