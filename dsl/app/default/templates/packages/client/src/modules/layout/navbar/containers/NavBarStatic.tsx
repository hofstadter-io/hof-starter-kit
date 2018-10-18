import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';
import { Container, Navbar, Nav, NavItem } from 'reactstrap';

import i18n from 'i18next';
import { LanguagePicker } from '../../../../modules/common/components/web';

import translate from '../../../../i18n';
import modules from '../../../../modules';
import settings from '../../../../../../../settings';

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

const NavBarStyled = styled.nav`
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
          <Navbar>
            {{#with DslContext.layout.navbar as |NAVBAR|}}
            <Nav>
              <NavLink to="/" className="navbar-brand" id="brand-logo">
                {{#if (eq NAVBAR.logo.type "image")}}
                <img src="{{{NAVBAR.logo.source}}}" />
                {{else if (eq NAVBAR.logo.type "text")}}
                {{NAVBAR.logo.value}}
                {{else}}
                {settings.app.name}
                {{/if}}
              </NavLink>

              {{#each NAVBAR.leftItems as |ITEM|}}
              {{#if ITEM.roles}}
                <IfLoggedIn key="{{{ITEM.href}}}" role={[{{#each ITEM.roles as |R|}}"{{R}}"{{#unless @last}}, {{/unless}}{{/each}}]}>
                  <NavLink to="{{{ITEM.href}}}" className="nav-link">
                    {t('{{ITEM.name}}')}
                  </NavLink>
                </IfLoggedIn>
              {{else}}
              <NavLink to="{{{ITEM.href}}}" className="nav-link">
                {t('{{ITEM.name}}')}
              </NavLink>
              {{/if}}
              {{/each}}

            </Nav>
            {{/with}}

            <Nav className="justify-content-end">
              <IfLoggedIn key="/profile">
                <NavLink to="/profile" className="nav-link" activeClassName="active">
                  <ProfileName />
                </NavLink>
              </IfLoggedIn>
              <IfLoggedIn key="/logout">
                <LogoutLink t={t}/>
              </IfLoggedIn>
              <IfNotLoggedIn key="/login">
                <NavLink to="/login" className="nav-link" activeClassName="active">
                  {t('signin')}
                </NavLink>
              </IfNotLoggedIn>

              <LanguagePicker i18n={i18n} />
            </Nav>
          </Navbar>
        </div>
      </NavbarStyled>
    );
  }
}

export default translate('navbar')(NavBar);
