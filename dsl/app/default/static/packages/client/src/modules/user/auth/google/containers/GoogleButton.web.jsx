import React from 'react';
import { withApollo } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../../../common/components/web';
import access from '../../../access';
import './GoogleButton.css';

const googleLogin = () => {
  window.location = '/auth/google';
};

const GoogleButton = withApollo(({ client, text }) => {
  return (
    <Button type="button" size="lg" onClick={() => access.doLogin(client).then(googleLogin)} className="googleBtn">
      <div className="iconContainer">
        <FontAwesomeIcon icon={['fab', 'google']} className="googleIcon" />
        <div className="separator" />
      </div>
      <div className="btnText">
        <span>{text}</span>
      </div>
    </Button>
  );
});

const GoogleLink = withApollo(({ client, text }) => {
  return (
    <Button color="link" onClick={() => access.doLogin(client).then(googleLogin)} style={{ marginTop: 10 }}>
      {text}
    </Button>
  );
});

const GoogleIcon = withApollo(({ client }) => {
  return (
    <FontAwesomeIcon
      icon={['fab', 'google']}
      style={{ marginTop: 10, color: '#c43832', fontSize: 40 }}
      onClick={() => access.doLogin(client).then(googleLogin)}
    />
  );
});

const GoogleComponent = ({ type, text }) => {
  switch (type) {
    case 'button':
      return <GoogleButton text={text} />;
    case 'link':
      return <GoogleLink text={text} />;
    case 'icon':
      return <GoogleIcon />;
    default:
      return <GoogleButton text={text} />;
  }
};

export default GoogleComponent;
