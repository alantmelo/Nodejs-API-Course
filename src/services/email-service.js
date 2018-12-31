'use strict';
var config = require('../config');
const sgMail = require('@sendgrid/mail');

exports.send = async (to, subject, body) => {
    sgMail.setApiKey(config.sendgridKey);
    const msg = {
        to: 'alantmelo@live.com',
        from: 'alantmelo@live.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
}