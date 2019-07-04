const { getUsersList } = require('../servicesDatabase/user'),
  logger = require('../logger'),
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
  const user = req.body;
  const controllerResponse = { user: '' };
  return loginAdmin(user)
    .then(response => {
      const isCreated = response[1];
      if (isCreated) {
        const createdUser = response[0];
        logger.info(`The admin user ${createdUser.name} was created successfully`);
        controllerResponse.user = userSerializer(createdUser);
      }
      const updatedUser = response[0];
      logger.info(`User ${updatedUser.email} updated as admin`);
      controllerResponse.user = userSerializer(updatedUser);
      return res.status(200).send(controllerResponse);
    })
    .catch(next);
};

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  return loginUser(email, password)
    .then(token => {
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
      return res.status(200).send({ page, pageSize, users: listUsersSerializer(result) });
    })
    .catch(next);
};
