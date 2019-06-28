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

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return findUserByEmail(email)
    .then(user => {
      if (!user) {
        throw errors.userSigninError('Email or password invalid');
      }
      return comparePassword(password, user.password);
    })
    .then(passwordIsValid => {
      if (!passwordIsValid) {
        throw errors.userSigninError('Email or password invalid');
      }
      const token = generateToken(email);
      logger.info(`User ${email} singed in successfully`);
      return res.status(200).send({ token });
    })
    .catch(next);
};
