const request = require('supertest'),
  { factory } = require('factory-girl');

const app = require('../app.js');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const expiredTokenError = 401,
  validPassword = 'myPassword123',
  validEmail = 'dummy.user@wolox.co';

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
      .then(response =>
        delay(2000).then(() =>
          request(app)
            .get('/users')
            .set({ token: response.body.token })
        )
      )
      .then(response => {
        expect(response.statusCode).toBe(expiredTokenError);
        expect(response.body.message).toBe('Token expired');
        expect(response.body.internal_code).toBe('authentication_error');
      }));
});
