{{#with DslContext as |APP|}}
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavItem } from 'reactstrap';

import { MenuItem } from '../../../../../../modules/common/components/web';
import modules from '../../../../../../modules';
import settings from '../../../../../../../../../settings';

// App mode: {{APP.mode}}

const NavBar = () => (
  <Navbar color="faded" light>
    <Container>
      <Nav>
        {{#with APP.navbar.logo as |LOGO|}}
        <NavLink to="{{LOGO.link}}" className="navbar-brand">
          {{LOGO.value}}
        </NavLink>
        {{/with}}
        {{#each APP.navbar.items as |ITEM|}}
          <MenuItem key="{{ITEM.link}}">
            <NavLink to="{{ITEM.link}}" className="nav-link" activeClassName="active">
              {{ITEM.name}}
            </NavLink>
          </MenuItem>
        {{/each}}
      </Nav>

      <Nav className="justify-content-end">
        {modules.navItemsRight}

        {{#if (or (eq APP.mode "live") (eq APP.mode "prod"))}}
        {{else}}
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
