const request = require('supertest'),
  { factory } = require('factory-girl');

const app = require('../app.js');

const singInStatusCode = 200,
  signInInvalidUserCode = 401,
  signInInvalidPasswordCode = 401,
  signInSchemaErrorCode = 422,
  validPassword = 'myPassword123',
  invalidPassword = 'myFakePassword123',
  validEmail = 'dummy.user@wolox.co',
  invalidEmail = 'fake.dummy.user@wolox.co';

describe('POST /users/sessions', () => {
  beforeEach(() =>
    factory.create('user', {
      email: validEmail,
      password: validPassword
    })
  );

  test('Signing in successfully', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response => {
        expect(response.statusCode).toBe(singInStatusCode);
      }));
  test('Signing in with no existing user Email in database', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: invalidEmail, password: validPassword })
      .then(response => {
        expect(response.statusCode).toBe(signInInvalidUserCode);
      }));
  test('Signing in with invalid user password', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: invalidPassword })
      .then(response => {
        expect(response.statusCode).toBe(signInInvalidPasswordCode);
      }));
  test.each([
    {
      email: validEmail
    },
    {
      password: validPassword
    },
    {}
  ])('Signing in with missing parameter %p', testN =>
    request(app)
      .post('/users/sessions')
      .send(testN)
      .then(response => expect(response.statusCode).toBe(signInSchemaErrorCode))
  );
});
