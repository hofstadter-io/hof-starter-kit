{{#with DslContext as |APP|}}
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { NavLink, withRouter } from 'react-router-dom';

import translate from '../../i18n';
import access from './access';
import resolvers from './resolvers';
import resources from './locales';
import ProfileView from './containers/Profile';
import { MenuItem } from '../../modules/common/components/web';
import Users from './containers/Users';
import UserEdit from './containers/UserEdit';
import UserAdd from './containers/UserAdd';
import Register from './containers/Register';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';

import { AuthRoute, IfLoggedIn, IfNotLoggedIn, withLoadedUser, withLogout } from './containers/Auth';

import Feature from '../ClientModule';

const ProfileName = withLoadedUser(
  ({ currentUser }) => (currentUser ? currentUser.username || currentUser.email : null)
);

const LogoutLink = withRouter(
  withLogout(({ logout, history }) => (
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
      Logout
    </a>
  ))
);

export * from './containers/Auth';

const NavLinkUsersWithI18n = translate('user')(({ t }) => (
  <NavLink to="/users" className="nav-link" activeClassName="active">
    {t('navLink.users')}
  </NavLink>
));
const NavLinkLoginWithI18n = translate('user')(({ t }) => (
  <NavLink to="/login" className="nav-link" activeClassName="active">
    {t('navLink.sign')}
  </NavLink>
));

export default new Feature(access, {
  route: [
    <AuthRoute exact path="/profile" role={['user', 'admin']} redirect="/login" component={ProfileView} />,
    <AuthRoute exact path="/users" redirect="/profile" role="admin" component={Users} />,
    <AuthRoute exact path="/users/new" role={['admin']} component={UserAdd} />,
    <AuthRoute path="/users/:id" redirect="/profile" role={['user', 'admin']} component={UserEdit} />,
    {{#unless APP.auth.registration.disabled}}
    <AuthRoute exact path="/register" redirectOnLoggedIn redirect="{{ternary APP.auth.login-redirect '/profile' }}" component={Register} />,
    {{/unless}}
    <AuthRoute
      exact
      path="/login"
      redirectOnLoggedIn
      redirect="/"
      component={withRouter(({ history }) => (
        <Login onLogin={() => history.push('{{ternary APP.auth.login-redirect "/profile" }}')} />
      ))}
    />,
    <AuthRoute exact path="/forgot-password" redirectOnLoggedIn redirect="{{ternary APP.auth.login-redirect '/profile' }}" component={ForgotPassword} />,
    <AuthRoute exact path="/reset-password/:token" redirectOnLoggedIn redirect="{{ternary APP.auth.login-redirect '/profile' }}" component={ResetPassword} />
  ],
  navItem: [
    <IfLoggedIn key="/users" role="admin">
      <MenuItem>
        <NavLinkUsersWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemRight: [
    <IfLoggedIn key="/profile">
      <MenuItem>
        <NavLink to="/profile" className="nav-link" activeClassName="active">
          <ProfileName />
        </NavLink>
      </MenuItem>
    </IfLoggedIn>,
    <IfLoggedIn key="/logout">
      <MenuItem>
        <LogoutLink />
      </MenuItem>
    </IfLoggedIn>,
    <IfNotLoggedIn key="/login">
      <MenuItem>
        <NavLinkLoginWithI18n />
      </MenuItem>
    </IfNotLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'user', resources }],
  // eslint-disable-next-line react/display-name
  rootComponentFactory: [req => (req ? <CookiesProvider cookies={req.universalCookies} /> : <CookiesProvider />)]
});
{{/with}}
