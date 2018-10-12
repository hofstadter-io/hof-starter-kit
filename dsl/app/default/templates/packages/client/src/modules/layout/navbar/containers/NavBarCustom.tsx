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
      {{{file DslContext.layout.navbar.file}}}
    );
  }
}

export default translate('navbar')(NavBar);
