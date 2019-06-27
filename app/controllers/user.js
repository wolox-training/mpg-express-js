const { createUser } = require('../servicesDatabase/user'),
  logger = require('../logger'),
  { encryptPassword } = require('../utils/userSignup');

exports.signUp = (req, res, next) => {
  const newUser = req.body;

  return encryptPassword(newUser.password)
    .then(hash => {
      newUser.password = hash;
      return createUser(newUser);
    })
    .then(createdUser => {
      logger.info(`the user ${createdUser.name} was created successfully`);
      res.status(200).send(createdUser);
    })
    .catch(next);
};
/* eslint-disable no-unused-vars */
exports.signIn = (req, res, next) => {
  const user = req.body;
};
