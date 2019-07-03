const errors = require('../errors'),
  { user } = require('../models'),
  logger = require('../logger');

exports.createUser = newUser =>
  user.create(newUser).catch(err => {
    logger.error(err.message);
    throw errors.userSignupError('Error creating user in the database');
  });

exports.updateUser = (userInstance, data) =>
  userInstance.update(data).catch(err => {
    logger.error(err.message);
    throw errors.userSignupError('Error updating user in the database');
  });

exports.findUserByEmail = email =>
  user
    .findOne({
      where: {
        email
      }
    })
    .catch(err => {
      logger.error(err.message);
      throw errors.databaseError('Error finding email in database');
    });

exports.getUsersList = (pageSize, offset) =>
  user.findAll({ limit: pageSize, offset }).catch(err => {
    logger.error(err.message);
    throw errors.databaseError('Error finding users in database');
  });
