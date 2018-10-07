import nodemailer from 'nodemailer';
import mailgunTransport from 'nodemailer-mailgun-transport';

import settings from '../../../../../settings';

const mailerConfig = settings.mailer;

var transport = null;

if (mailerConfig.provider === "mailgun") {
    // Configure transport options
    const mailgunOptions = {
        auth: {
            api_key: mailerConfig.auth.pass,
            domain: mailerConfig.auth.user,
        }
    }

    transport = mailgunTransport(mailgunOptions)

} else {
    transport = mailerConfig;
}

const nm = nodemailer.createTransport(transport);

export default nm;
