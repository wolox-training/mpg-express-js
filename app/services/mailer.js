const nodemailer = require('nodemailer'),
  errors = require('../errors'),
  logger = require('../logger'),
  config = require('./../../config');

const transporter = nodemailer.createTransport({
  host: config.common.mailer.host,
  port: config.common.mailer.port,
  auth: {
    user: config.common.mailer.auth.user,
    pass: config.common.mailer.auth.pass
  }
});

exports.sendMail = mailOptions => {
  logger.info(`Sending email to ${mailOptions.to}`);
  return transporter.sendMail(mailOptions).catch(err => {
    logger.error(err.message);
    throw errors.emailError(err.message);
  });
};
