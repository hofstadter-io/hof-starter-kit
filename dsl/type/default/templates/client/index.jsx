{{#with DslContext as |TYPE|}}
// {{TYPE.name}}
import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import { AuthRoute } from '../../user/containers/Auth';

import translate from '../../../i18n';
import ClientModule from "../../ClientModule";

import resolvers from './resolvers';

import {{camelT TYPE.name}}Create from './containers/add.jsx'
import {{camelT TYPE.name}}List from './containers/list.jsx'
import {{camelT TYPE.name}}View from './containers/view.jsx'
import {{camelT TYPE.name}}Edit from './containers/edit.jsx'

export default new ClientModule({
  route: [
    {{#if TYPE.pages.create}}
    <AuthRoute exact path="{{TYPE.pages.create.route}}" role={['user', 'admin']} redirect="/login" component={ {{camelT TYPE.name}}Create } />,
    {{/if}}
    {{#if TYPE.pages.list}}
    <AuthRoute exact path="{{TYPE.pages.list.route}}" role={['user', 'admin']} redirect="/login" component={ {{camelT TYPE.name}}List } />,
    {{/if}}
    {{#if TYPE.pages.update}}
    <AuthRoute path="{{TYPE.pages.update.route}}" role={['user', 'admin']} redirect="/login" component={ {{camelT TYPE.name}}Edit } />,
    {{/if}}
    {{#if TYPE.pages.view}}
    <AuthRoute path="{{TYPE.pages.view.route}}" role={['user', 'admin']} redirect="/login" component={ {{camelT TYPE.name}}View } />,
    {{/if}}
  ],
  resolver: [resolvers],
});

{{/with}}
