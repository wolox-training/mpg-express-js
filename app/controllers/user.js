const { createUser, findUserByEmail, getUsersList } = require('../servicesDatabase/user'),
  errors = require('../errors'),
  logger = require('../logger'),
  { encryptPassword, comparePassword } = require('../utils/userValidations'),
  { pagination } = require('../utils/pagination'),
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
        logger.error('Invalid email');
        throw errors.userSigninError('Email or password invalid');
      }
      return comparePassword(password, user.password);
    })
    .then(passwordIsValid => {
      if (!passwordIsValid) {
        logger.error('Invalid password');
        throw errors.userSigninError('Email or password invalid');
      }
      const token = generateToken(email);
      logger.info(`User ${email} singed in successfully`);
      return res.status(200).send({ token });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  const { page, pageSize, offset } = pagination(req.query.page, req.query.pageSize);
  return getUsersList(pageSize, offset)
    .then(result => {
      logger.info('Users list consulted successfully');
      res.status(200).send({ page, pageSize, users: result });
    })
    .catch(next);
};
