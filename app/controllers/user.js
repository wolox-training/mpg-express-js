const moment = require('moment');

const { getUsersList, updateUser } = require('../servicesDatabase/user'),
  logger = require('../logger'),
  config = require('../../config'),
  { pagination } = require('../utils/pagination'),
  { userSerializer, listUsersSerializer } = require('../serializers/user');

const { createNewUser, loginUser, loginAdmin } = require('../interactors/user');

exports.signUp = (req, res, next) => {
  const newUser = req.body;

  return createNewUser(newUser)
    .then(createdUser => {
      logger.info(`The user ${createdUser.name} was created successfully`);
      return res.status(200).send({ user: userSerializer(createdUser) });
    })
    .catch(next);
};

exports.signUpAdmin = (req, res, next) => {
  const userToSingUp = req.body;
  return loginAdmin(userToSingUp)
    .then(([user, isCreated]) => {
      if (isCreated) {
        logger.info(`The admin user ${user.name} was created successfully`);
      } else {
        logger.info(`User ${user.email} updated as admin`);
      }
      return res.status(200).send({ user: userSerializer(user) });
    })
    .catch(next);
};

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return loginUser(email, password)
    .then(token => {
      logger.info(`User ${email} singed in successfully`);
      const tokenExpirationTime = moment()
        .add(config.common.session.expirationTime, 'seconds')
        .format('YYYY-MM-DD HH:mm');
      return res.status(200).send({ token, expiration_time: tokenExpirationTime });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  const { page, pageSize, offset } = pagination(req.query.page, req.query.pageSize);
  return getUsersList(pageSize, offset)
    .then(result => {
      logger.info('Users list consulted successfully');
      return res.status(200).send({ page, pageSize, users: listUsersSerializer(result) });
    })
    .catch(next);
};

exports.invalidateAllSessions = (req, res, next) => {
  const loggerUser = { ...req.session };
  loggerUser.sessionKey = moment().unix();

  return updateUser(loggerUser)
    .then(() => {
      logger.info(`All sessions of the user ${loggerUser.email} were invalidated`);
      return res.status(200).send({
        message: `All sessions of the user ${loggerUser.email} were invalidated`
      });
    })
    .catch(next);
};
