const moment = require('moment');

const { authenticationError, userPermissionsError } = require('../errors'),
  logger = require('../logger'),
  config = require('../../config'),
  {
    AUTHENTICATION_ERROR_MSG,
    ADMIN_AUTHENTICATION_ERROR_MSG,
    PURCHASED_ALBUMS_ERROR_MSG,
    TOKEN_EXPIRED_ERROR_MSG,
    INVALID_TOKEN_ERROR_MSG
  } = require('../constants/errors'),
  { validateToken } = require('../utils/token'),
  { findUserByEmail } = require('../servicesDatabase/user');

exports.authenticate = (validateAdmin = false) => (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return next(authenticationError(AUTHENTICATION_ERROR_MSG));
  }
  try {
    const decodeToken = validateToken(token);
    const sessionExpirationTime = moment
      .unix(decodeToken.iat)
      .add(config.common.session.expirationTime, 'seconds');

    if (moment().isAfter(sessionExpirationTime)) {
      return next(authenticationError(TOKEN_EXPIRED_ERROR_MSG));
    }
    return findUserByEmail(decodeToken.user)
      .then(user => {
        if (!user) {
          return next(authenticationError(AUTHENTICATION_ERROR_MSG));
        }
        if (decodeToken.sessionKey !== user.sessionKey) {
          return next(authenticationError(INVALID_TOKEN_ERROR_MSG));
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

exports.validateAlbumIdPurchased = (req, res, next) => {
  const loggedUser = { ...req.session },
    { user_id: userId } = req.params;
  if (loggedUser.id !== userId && !loggedUser.isAdmin) {
    return next(userPermissionsError(PURCHASED_ALBUMS_ERROR_MSG));
  }
  return next();
};
