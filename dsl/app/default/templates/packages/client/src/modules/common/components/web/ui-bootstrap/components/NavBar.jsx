{{#with DslContext as |APP|}}
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavItem } from 'reactstrap';

import modules from '../../../../../../modules';
import settings from '../../../../../../../../../settings';

const NavBar = () => (
  <Navbar color="faded" light>
    <Container>
      <Nav>
        <NavLink to="/" className="navbar-brand">
          {settings.app.name}
        </NavLink>
        {modules.navItems}
      </Nav>

      <Nav className="justify-content-end">
        {modules.navItemsRight}
        {{#if (and (ne APP.mode "live") (ne APP.mode "prod"))}}
        {__DEV__ && (
          <NavItem>
            <a href="/graphql" className="nav-link">
              GPlayground
            </a>
          </NavItem>
        )}
        {{/if}}
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar;
{{/with}}
