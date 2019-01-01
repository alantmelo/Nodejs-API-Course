'use strict';
var config = require('../config');
const sgMail = require('@sendgrid/mail');

exports.send = async (to, subject, body) => {
    sgMail.setApiKey(config.sendgridKey);
    const msg = {
        to: to,
        from: 'alantmelo@live.com',
        subject: subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: body,
    };
    sgMail.send(msg);
}