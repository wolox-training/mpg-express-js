const request = require('supertest'),
  app = require('../app.js'),
  { createUser } = require('../app/servicesDatabase/user');

const userCreatedStatusCode = 200,
  signUpValidationError = 422,
  signUpError = 503,
  testUser = {
    name: 'Jonh',
    lastname: 'Doe',
    email: 'test@wolox.co',
    password: 'abc12345'
  };

describe('POST /users', () => {
  test('Signing up user successfully', () =>
    request(app)
      .post('/users')
      .send(testUser)
      .then(response => {
        expect(response.statusCode).toBe(userCreatedStatusCode);
      }));
  test('Signing up with email that already exist in database', () =>
    createUser(testUser)
      .then(() =>
        request(app)
          .post('/users')
          .send(testUser)
      )
      .then(response => {
        expect(response.statusCode).toBe(signUpError);
      }));
  test('Signing up with invalid password', () => {
    const testUserInvalidPassword = { ...testUser };
    testUserInvalidPassword.password = 'abc12.';
    return request(app)
      .post('/users')
      .send(testUserInvalidPassword)
      .then(response => {
        expect(response.statusCode).toBe(signUpValidationError);
      });
  });
  /* test.each([
    {
      lastname: 'Doe',
      email: 'test@wolox.co',
      password: 'abc12345'
    },
    {
      name: 'Jonh',
      email: 'test@wolox.co',
      password: 'abc12345'
    },
    {
      name: 'Jonh',
      lastname: 'Doe',
      password: 'abc12345'
    },
    {
      name: 'Jonh',
      lastname: 'Doe',
      email: 'test@wolox.co'
    },
    {}
  ])('Signing up with missing parameter %p', testN =>
    request(app)
      .post('/users')
      .send(testN)
      .then(response => {
        expect(response.statusCode).toBe(signUpValidationError);
      })
  );*/
});
