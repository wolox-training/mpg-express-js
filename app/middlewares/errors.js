const errors = require('../errors'),
  logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500,
  [errors.EXTERNAL_API_ERROR]: 500,
  [errors.INVALID_PARAMETER_ERROR]: 400,
  [errors.USER_SIGNUP_ERROR]: 503,
  [errors.SCHEMA_ERROR]: 422,
  [errors.HASH_ERROR]: 500,
  [errors.NOT_FOUND_ERROR]: 404,
  [errors.USER_SIGNIN_ERROR]: 401,
  [errors.AUTHENTICATION_ERROR]: 401,
  [errors.ALBUM_BUY_ERROR]: 409,
  [errors.USER_PERMISSIONS_ERROR]: 401,
  [errors.GET_PHOTOS_ERROR]: 409,
  [errors.EMAIL_ERROR]: 500
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  } else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(JSON.stringify(error));
  return res.send({ message: error.message, internal_code: error.internalCode });
};
