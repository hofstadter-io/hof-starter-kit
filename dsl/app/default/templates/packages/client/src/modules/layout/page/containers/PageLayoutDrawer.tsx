import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import { Drawer } from '../../drawer';
import { NavBar } from '../../navbar';
import { Footer } from '../../footer';

class PageLayout extends React.Component {
  state = {
    showDrawer: true
  }

  toggleDrawer = () => {
    this.setState({
      showDrawer: !this.state.showDrawer
    })

  }

  public render() {
    const { showDrawer } = this.state.showaDrawer;
    const { children } = this.props;

    return (
      <section className="d-flex flex-column flex-grow-1">
        <section className="d-flex flex-column flex-grow-1 flex-shrink-0">
          <section className="d-flex flex-column">
            <NavBar toggleDrawer={this.toggleDrawer} />
          </section>
          <section className="d-flex flex-row">
            <section id="app-drawer" className="d-flex flex-column">
              <Drawer showDrawer={ showDrawer } />
            </section>
            <Container id="content">{children}</Container>
          </section>

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
