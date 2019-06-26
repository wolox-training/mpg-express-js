const { validatePassword, validateEmail } = require('../userSignup.js');
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
      errorMessage: 'Invalid Email'
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Email is required'
    }
  },
  password: {
    custom: {
      options: value => validatePassword(value),
      errorMessage: 'Invalid password'
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Password is required'
    }
  }
};
