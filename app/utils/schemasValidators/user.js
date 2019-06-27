const { validatePassword, validateEmail } = require('../userSignup.js'),
  errors = require('../../constants/errors');
/* eslint-disable no-undef */
exports.userSignUpSchema = {
  name: {
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_NAME_ERROR
    }
  },
  lastname: {
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_LASTNAME_ERROR
    }
  },
  email: {
    custom: {
      options: value => validateEmail(value),
      errorMessage: errors.INVALID_EMAIL_ERROR
    },
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_EMAIL_ERROR
    }
  },
  password: {
    custom: {
      options: value => validatePassword(value),
      errorMessage: errors.INVALID_PASSWORD_ERROR
    },
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_PASSWORD_ERROR
    }
  }
};
exports.userSignInSchema = {
  email: {
    custom: {
      options: value => validateEmail(value),
      errorMessage: errors.INVALID_EMAIL_ERROR
    },
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_EMAIL_ERROR
    }
  },
  password: {
    custom: {
      options: value => validatePassword(value),
      errorMessage: errors.INVALID_PASSWORD_ERROR
    },
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_PASSWORD_ERROR
    }
  }
};
