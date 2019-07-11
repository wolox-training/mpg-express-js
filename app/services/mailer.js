const nodemailer = require('nodemailer'),
  errors = require('../errors'),
  logger = require('../logger'),
  config = require('./../../config');

const transporter = nodemailer.createTransport({
  host: config.common.mailer.host || 'smtp.mailtrap.io',
  port: config.common.mailer.port || 2525,
  auth: {
    user: config.common.mailer.auth.user || '6de5aad745b14e',
    pass: config.common.mailer.auth.pass || '18d825e82719bd'
  }
});

exports.sendMail = mailOptions => {
  logger.info(`Sending email to ${mailOptions.to}`);
  return transporter.sendMail(mailOptions).catch(err => {
    logger.error(err.message);
    throw errors.emailError(err.message);
  });
};
