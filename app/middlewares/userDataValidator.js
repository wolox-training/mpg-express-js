const { checkSchema, validationResult } = require('express-validator');
const { userDataError } = require('../errors');

module.exports = userSignUpSchema => [
  checkSchema(userSignUpSchema),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(userDataError(errors));
    }
    return next();
  }
];
