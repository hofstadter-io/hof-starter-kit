import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavItem } from 'reactstrap';

import { IfLoggedIn, IfNotLoggedIn } from './containers/Auth';

import translate from '../../i18n';
import modules from '../../../modules';
import settings from '../../../../../../settings';

const NavLinkLoginWithI18n = translate('navbar')(({ t }) => (
  <NavLink to="/login" className="nav-link" activeClassName="active">
    {t('navLink.sign')}
  </NavLink>
));

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
        {__DEV__ && (
          <NavItem>
            <a href="/graphiql" className="nav-link">
              GraphiQL
            </a>
          </NavItem>
        )}
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar;
