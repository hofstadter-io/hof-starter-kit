import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import { Drawer } from '../../drawer';
import { NavBar } from '../../navbar';
import { Footer } from '../../footer';

class PageLayout extends React.Component {
  public render() {
    const { children } = this.props;
    return (
      <section className="d-flex flex-column flex-grow-1">
        <section className="d-flex flex-column flex-grow-1 flex-shrink-0">
          <section className="d-flex flex-column"><NavBar /></section>
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
