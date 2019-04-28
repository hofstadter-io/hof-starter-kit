import React from 'react';
import { Container } from 'reactstrap';

import { Drawer } from '../../drawer';
import { NavBar } from '../../navbar';
import { Footer } from '../../footer';

class PageLayout extends React.Component<{children: any}> {

  state = {
    showDrawer: true
  };

  toggleDrawer = () => {
    this.setState({
      showDrawer: !this.state.showDrawer
    })
  };

  public render() {
    const { children } = this.props;

    return (
      <section className="d-flex flex-column flex-grow-1">
        <section className="d-flex flex-column flex-grow-1 flex-shrink-0">
          <section className="d-flex flex-column">
            <NavBar toggleDrawer={this.toggleDrawer} />
          </section>
          <section className="d-flex flex-row">
            {{#if DslContext.layout.drawer.enabled}}
            <section id="app-drawer" className="d-flex flex-column">
              <Drawer showDrawer={ this.state.showDrawer } />
            </section>
            {{/if}}
            <Container id="content">{children}</Container>
          </section>

        </section>
        <Footer />
      </section>
    );
  };

}

export default PageLayout;
