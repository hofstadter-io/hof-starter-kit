import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavItem } from 'reactstrap';

import translate from '../../../../i18n';
import modules from '../../../../modules';
import settings from '../../../../../../../settings';

import { IfLoggedIn, IfNofLoggedIn } from '../../../user';

class NavBar extends React.Component {
  public static propTypes = {
    t: PropTypes.func
  };

  public render() {
    const { t } = this.props;
    return (
      <Navbar color="faded" light>
        <Container>
          <Nav>
            <NavLink to="/" className="navbar-brand">
              {settings.app.name}
            </NavLink>

            <IfLoggedIn key="/users" role="admin">
              <NavLink to="/users" className="nav-link">
                {t('users')}
              </NavLink>
            </IfLoggedIn>

            <NavLink to="/about" className="nav-link">
              {t('about')}
            </NavLink>

            <NavLink to="/contact" className="nav-link">
              {t('contact')}
            </NavLink>
          </Nav>

          <Nav className="justify-content-end">
            {modules.navItemsRight}
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default translate('navbar')(NavBar);
