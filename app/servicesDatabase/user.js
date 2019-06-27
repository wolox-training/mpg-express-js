const errors = require('../errors'),
  { user } = require('../models'),
  logger = require('../logger');

exports.createUser = newUser =>
  user.create(newUser).catch(err => {
    logger.error(err.message);
    throw errors.userSignupError('Error creating user in the database');
  });

exports.findUserByEmail = userEmail =>
  user.findOne({
    where: {
      email: userEmail
    }
  }).catch(err => {
    logger.error(err.message);
    throw errors.notFoundError('User email not found in database');
  });

