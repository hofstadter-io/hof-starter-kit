export default {
  provider: "{{DslContext.config.mailer.provider}}",
  sender: "{{DslContext.config.mailer.sender}}",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};
