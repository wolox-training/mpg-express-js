const { authenticationError } = require('../errors'),
  logger = require('../logger'),
  { AUTHENTICATION_ERROR_MSG, ADMIN_AUTHENTICATION_ERROR_MSG } = require('../constants/errors'),
  { validateToken } = require('../utils/token'),
  { findUserByEmail } = require('../servicesDatabase/user');

exports.authenticate = (validateAdmin = false) => (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return next(authenticationError(AUTHENTICATION_ERROR_MSG));
  }
  try {
    const decodeToken = validateToken(token);
    return findUserByEmail(decodeToken.user)
      .then(user => {
        if (!user) {
          return next(authenticationError(AUTHENTICATION_ERROR_MSG));
        }
        if (validateAdmin && !user.isAdmin) {
          return next(authenticationError(ADMIN_AUTHENTICATION_ERROR_MSG));
        }
        logger.info(`User ${user.email} authenticated successfully`);
        req.session = { ...user.dataValues };
        return next();
      })
      .catch(next);
  } catch (err) {
    return next(authenticationError(AUTHENTICATION_ERROR_MSG));
  }
};
