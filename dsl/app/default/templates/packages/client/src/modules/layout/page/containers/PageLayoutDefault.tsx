import React from 'react';
import { Container } from 'reactstrap';

import { NavBar } from '../../navbar';

{{#if DslContext.layout.drawer.enabled}}
import { Drawer } from '../../drawer';
{{/if}}

import { Footer } from '../../footer';

class PageLayout extends React.Component<{children: any}> {

  {{#if DslContext.layout.drawer.enabled}}
  state = {
    showDrawer: true
  };

  toggleDrawer = () => {
    this.setState({
      showDrawer: !this.state.showDrawer
    })
  };
  {{/if}}

  public render() {
    const { children } = this.props;

    return (
      <section className="d-flex flex-column flex-grow-1">
        <section className="d-flex flex-column flex-grow-1 flex-shrink-0">
          <section className="d-flex flex-column shadow-sm">
            {{#if DslContext.layout.drawer.enabled}}
            <NavBar toggleDrawer={this.toggleDrawer} />
            {{else}}
            <NavBar />
            {{/if}}
          </section>
          <section className="d-flex flex-row flex-grow-1">
            {{#if DslContext.layout.drawer.enabled}}
            <section id="app-drawer" className="d-flex flex-column border-right">
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
