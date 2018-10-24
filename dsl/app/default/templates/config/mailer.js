export default {
  provider: "{{DslContext.config.mailer.provider}}",
  sender: "{{DslContext.config.mailer.sender}}",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: "{{DslContext.secrets.mailgun.domain}}",
    pass: "{{DslContext.secrets.mailgun.apikey}}"
  }
};
