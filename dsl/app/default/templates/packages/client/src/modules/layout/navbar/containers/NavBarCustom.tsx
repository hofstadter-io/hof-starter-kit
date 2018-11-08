import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NavLink, withRouter } from 'react-router-dom';
import * as RS from 'reactstrap';

import i18n from 'i18next';
import { LanguagePicker } from '../../../../modules/common/components/web';
import translate from '../../../../i18n';

import { IfLoggedIn, IfNotLoggedIn, withLoadedUser, withLogout } from '../../../user/containers/Auth';

const ProfileName = withLoadedUser(
  ({ currentUser }) => (currentUser ? currentUser.fullName || currentUser.username : null)
);

const LogoutLink = translate('navbar')(
  withRouter(
    withLogout(({ logout, history, t }) => (
      <a
        href="javascript:void(0)"
        onClick={e => {
          e.preventDefault();
          (async () => {
            await logout();
            history.push('/');
          })();
        }}
        className="nav-link"
      >
      {t('logout')}
      </a>
    ))
  )
);

const NavBarStyled = styled.div`
{{{file DslContext.layout.navbar.style}}}
`

class NavBar extends React.Component {
  public static propTypes = {
    t: PropTypes.func
  };

  public render() {
    const { t } = this.props;
    return (
      <NavBarStyled>
        <div id="styled-navbar">
          {{{file DslContext.layout.navbar.file}}}
        </div>
      </NavBarStyled>
    );
  }
}

export default translate('navbar')(NavBar);
