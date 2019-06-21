const errors = require('../errors'),
  { user } = require('../models'),
  logger = require('../logger');

exports.createUser = newUser =>
  user.create(newUser).catch(err => {
    logger.error(err.message);
    throw errors.userSignupError('Error creating user in the database');
  });
