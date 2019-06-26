const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EXTERNAL_API_ERROR = 'external_api_error';
exports.externalApiError = message => internalError(message, exports.EXTERNAL_API_ERROR);

exports.INVALID_PARAMETER_ERROR = 'invalid_parameter_error';
exports.invalidParameterError = message => internalError(message, exports.INVALID_PARAMETER_ERROR);

exports.USER_SIGNUP_ERROR = 'user_signup_error';
exports.userSignupError = message => internalError(message, exports.USER_SIGNUP_ERROR);

exports.HASH_ERROR = 'hash_error';
exports.hashError = message => internalError(message, exports.HASH_ERROR);

exports.USER_DATA_ERROR = 'user_data_error';
exports.userDataError = message => internalError(message, exports.USER_DATA_ERROR);
