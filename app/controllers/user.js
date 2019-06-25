const errors = require('../errors'),
  { createUser } = require('../servicesDatabase/user'),
  logger = require('../logger'),
  { validateEmail, validatePassword, encryptPassword } = require('../utils/userSignup');

exports.signUp = (req, res, next) => {
  const newUser = req.body;
  if (!validateEmail(newUser.email)) {
    logger.info('Error creating user, the email must be valid');
    return next(errors.userSignupError('invalid email'));
  }
  if (!validatePassword(newUser.password)) {
    logger.info('Error creating user, the password must be at least 8 alphanumeric characters');
    return next(errors.userSignupError('invalid password'));
  }
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
