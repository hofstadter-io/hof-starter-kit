import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavItem } from 'reactstrap';

import { MenuItem } from '../../../common/components/web';

import translate from '../../../../i18n';
import modules from '../../../../modules';
import settings from '../../../../../../../settings';

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

            <MenuItem>
              <NavLink to="/about" className="nav-link">
                {t('about')}
              </NavLink>
            </MenuItem>

            <MenuItem>
              <NavLink to="/contact" className="nav-link">
                {t('contact')}
              </NavLink>
            </MenuItem>
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
