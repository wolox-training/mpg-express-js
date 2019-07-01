const { authenticationError } = require('../errors'),
  logger = require('../logger'),
  { AUTHENTICATION_ERROR_MSG } = require('../constants/errors'),
  { validateToken } = require('../utils/token'),
  { findUserByEmail } = require('../servicesDatabase/user');

exports.authenticate = (req, res, next) => {
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
        logger.info(`User ${user.email} authenticated successfully`);
        return next();
      })
      .catch(next);
  } catch (err) {
    return next(authenticationError(AUTHENTICATION_ERROR_MSG));
  }
};
