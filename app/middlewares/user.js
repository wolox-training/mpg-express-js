const { validationResult } = require('express-validator');
const { userSignupError } = require('../errors');

exports.signUpDataValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(userSignupError(errors));
  }
  return next();
};
