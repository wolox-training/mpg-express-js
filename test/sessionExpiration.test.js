const request = require('supertest'),
  { factory } = require('factory-girl');

const config = require('../config'),
  app = require('../app.js');

const expiredTokenError = 401,
  validPassword = 'myPassword123',
  validEmail = 'dummy.user@wolox.co',
  defaultExpirationTime = config.common.session.expirationTime;

describe('sessions expiration', () => {
  beforeEach(() =>
    factory.create('user', {
      email: validEmail,
      password: validPassword
    })
  );
  test('Should not allow to get albums due to expired token', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response => {
        config.common.session.expirationTime = -1;
        return request(app)
          .get('/users')
          .set({ token: response.body.token });
      })
      .then(response => {
        config.common.session.expirationTime = defaultExpirationTime;
        expect(response.statusCode).toBe(expiredTokenError);
        expect(response.body.message).toBe('Token expired');
        expect(response.body.internal_code).toBe('authentication_error');
      }));
});
