import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import { NavBar } from '../../navbar';
import settings from '../../../../../../settings';

import { Footer } from '../../footer';

class PageLayout extends React.Component {
  public render() {
    const { children, navBar } = this.props;
    return (
      <section className="d-flex flex-column flex-grow-1">
        <section className="d-flex flex-column flex-grow-1 flex-shrink-0">
          <section className="d-flex flex-column">{navBar !== false && <NavBar />}</section>
          <Container id="content">{children}</Container>
        </section>
        <Footer />
      </section>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool
};

export default PageLayout;
