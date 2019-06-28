const { createUser, findUserByEmail } = require('../servicesDatabase/user'),
  errors = require('../errors'),
  logger = require('../logger'),
  { encryptPassword, comparePassword } = require('../utils/userValidations'),
  { generateToken } = require('../utils/token');

exports.signUp = (req, res, next) => {
  const newUser = req.body;

  return encryptPassword(newUser.password)
    .then(hash => {
      newUser.password = hash;
      return createUser(newUser);
    })
    .then(createdUser => {
      logger.info(`The user ${createdUser.name} was created successfully`);
      res.status(200).send(createdUser);
    })
    .catch(next);
};
/* eslint-disable no-unused-vars */
exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return findUserByEmail(email)
    .then(user => {
      if (user) {
        return comparePassword(password, user.password);
      }
      throw errors.notFoundError('User email not found in database');
    })
    .then(passwordIsValid => {
      if (passwordIsValid) {
        logger.info(`User ${email} singed in successfully`);
        return res.status(200).send({ token: generateToken(email) });
      }
      throw errors.userSigninError('User password is no valid');
    })
    .catch(next);
};
