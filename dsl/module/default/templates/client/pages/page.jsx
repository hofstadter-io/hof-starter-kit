{{#with RepeatedContext as |PAGE|}}
import ClientModule from '../../../ClientModule';

import { Route } from 'react-router-dom';
import { AuthRoute } from '../../user/containers/Auth';

// import Container from './container';

const Container = (props) => {
  console.log("{{PAGE.route}} - props", props)
  return (
    <p>hi</p>
  )
}

export default ClientModule({
  {{#if PAGE.route}}
  route: [
    {{#if PAGE.auth}}
    <AuthRoute
      exact
      path={"{{PAGE.route}}"}
      role={ {{{json PAGE.auth.roles}}} }
      redirect="/login"
      component={ Container }
    />,
    {{else}}
    <Route
      exact
      path={"{{PAGE.route}}"}
      component={ Container }
    />,
    {{/if}}
  ],
  {{/if}}
});

/*
{{{yaml PAGE}}}
*/

{{/with}}
