const request = require('supertest'),
  { factory } = require('factory-girl');

const app = require('../app.js'),
  { user } = require('../app/models'),
  { encryptPassword } = require('../app/utils/userValidations');

const singInStatusCode = 200,
  signInInvalidUserCode = 401,
  signInInvalidPasswordCode = 401,
  signInSchemaErrorCode = 422,
  validPassword = 'myPassword123',
  invalidPassword = 'myFakePassword123',
  validEmail = 'dummy.user@wolox.co',
  invalidEmail = 'fake.dummy.user@wolox.co';

factory.define(
  'user',
  user,
  {
    name: factory.chance('first'),
    lastname: factory.chance('last'),
    email: factory.chance('email', { domain: 'wolox.co' }),
    password: factory.chance('string', { length: 10 })
  },
  {
    afterCreate: model =>
      encryptPassword(model.password).then(password => {
        model.password = password;
        return model.save();
      })
  }
);

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
      .then(response => {
        expect(response.statusCode).toBe(signInSchemaErrorCode);
      })
  );
});
