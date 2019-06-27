const { validatePassword, validateEmail } = require('../userSignup.js'),
  errors = require('../../errors');
/* eslint-disable no-undef */
exports.userSignUpSchema = {
  name: {
    isEmpty: {
      negated: true,
      errorMessage: 'Name is required'
    }
  },
  lastname: {
    isEmpty: {
      negated: true,
      errorMessage: 'Lastname is required'
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
