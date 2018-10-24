{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

import { IfLoggedIn, IfNotLoggedIn, withLoadedUser } from '../../../user/containers/Auth';

import {{TypeName}}AddC from '../components/add';
import {{TypeName}}SDK from '../sdk';

class {{TypeName}}Add extends React.Component {
  constructor(props) {
    super(props);
    /*
    this.subscription = null;
    */
  }

  render() {
    return <{{TypeName}}AddC {...this.props} />;
  }
}

export default compose(
  withLoadedUser,
  {{TypeName}}SDK.Create
)({{TypeName}}Add);

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
