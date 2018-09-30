{{#with DslContext.config.oauth as |OAUTH|}}
const CERTIFICATE_DEVSERIAL = '00';
export default {
  secret: process.env.NODE_ENV === 'test' ? 'secret for tests' : process.env.AUTH_SECRET,
  auth: {
    access: {
      session: {
        enabled: true
      },
      jwt: {
        enabled: true,
        tokenExpiresIn: '1m',
        refreshTokenExpiresIn: '7d'
      }
    },
    password: {
      confirm: true,
      sendConfirmationEmail: true,
      sendAddNewUserEmail: true,
      enabled: true
    },
    certificate: {
      devSerial: CERTIFICATE_DEVSERIAL,
      enabled: false
    },
    facebook: {
      enabled: {{OAUTH.facebook}},
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_CLIENTSECRET,
      scope: ['email'],
      profileFields: ['id', 'emails', 'displayName']
    },
    github: {
      enabled: {{OAUTH.github}},
      clientID: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_CLIENTSECRET,
      scope: ['user:email']
    },
    linkedin: {
      enabled: {{OAUTH.linkedin}},
      clientID: process.env.LINKEDIN_CLIENTID,
      clientSecret: process.env.LINKEDIN_CLIENTSECRET,
      scope: ['r_emailaddress', 'r_basicprofile']
    },
    google: {
      enabled: {{OAUTH.google}},
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    }
  }
};
{{/with}}
