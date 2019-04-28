import React from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';
import { Container, Button, Navbar, Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';

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
            history.push('/');
            await logout();
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

class NavBar extends React.Component<{t: any, toggleDrawer?: any}> {
  state = {
      userDropdownOpen: false
  }

  toggle = () => {
      this.setState({
        userDropdownOpen: !this.state.userDropdownOpen
      });
  }

  public render() {
    // console.log("NavBar.props", this.props);
    // console.log("NavBar.state", this.state);
    const { t } = this.props;
    return (
      <NavBarStyled>
        <div id="styled-navbar">
          <Navbar>
            {{#with DslContext.layout.navbar as |NAVBAR|}}
            <Nav>
              {{#if DslContext.layout.drawer.enabled}}
              {{#if DslContext.layout.drawer.toggled}}
              <div onClick={ this.props.toggleDrawer }>
                <FontAwesomeIcon icon={['fas', 'bars']} size="lg" 
                  style={ {marginTop: '.25em', marginRight: '1em'} }
                />
              </div>
              {{/if}}
              {{/if}}
              <NavLink to="/" className="navbar-brand" id="brand-logo">
                {{#if (eq NAVBAR.logo.type "image")}}
                <img src="{{{NAVBAR.logo.source}}}" />
                {{else}}
                {{NAVBAR.logo.value}}
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

            <Nav className="justify-content-end">

              <IfLoggedIn key="user-dropdown">
                <Dropdown nav isOpen={this.state.userDropdownOpen} toggle={this.toggle}>
                  <DropdownToggle nav caret>
                    <ProfileName />
                  </DropdownToggle>
                  <DropdownMenu id="user-dropdown-menu">
                    {{#if NAVBAR.userItems}}
                    {{#each NAVBAR.userItems as |ITEM|}}
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
                    <IfLoggedIn key="/logout">
                      <LogoutLink t={t}/>
                    </IfLoggedIn>

                    {{else}}

                    <IfLoggedIn key="/profile">
                      <NavLink to="/profile" className="nav-link" activeClassName="active">
                        <ProfileName />
                      </NavLink>
                    </IfLoggedIn>
                    <IfLoggedIn key="/logout">
                      <LogoutLink t={t}/>
                    </IfLoggedIn>
                    {{/if}}
                  </DropdownMenu>
                </Dropdown>
              </IfLoggedIn>

              <IfNotLoggedIn key="/login">
                <NavLink to="/login" className="nav-link" activeClassName="active">
                  {t('signin')}
                </NavLink>
              </IfNotLoggedIn>

              <LanguagePicker i18n={i18n} />
            </Nav>

            {{/with}}
          </Navbar>
        </div>
      </NavBarStyled>
    );
  }
}

export default translate('navbar')(NavBar);
