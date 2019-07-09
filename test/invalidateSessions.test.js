const request = require('supertest'),
  { factory } = require('factory-girl');

const app = require('../app.js');

const invalidateTokenStatusCode = 200,
  invalidTokenErrorCode = 401,
  validPassword = 'myPassword123',
  validEmail = 'dummy.user@wolox.co';

describe('POST /users/sessions/invalidate_all', () => {
  beforeEach(() =>
    factory.create('user', {
      email: validEmail,
      password: validPassword
    })
  );

  test('Should not allow to login an user after the invalidation sessions', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response =>
        Promise.all([
          request(app)
            .post('/users/sessions/invalidate_all')
            .set({ token: response.body.token }),
          response.body.token
        ])
      )
      .then(([response, token]) => {
        expect(response.statusCode).toBe(invalidateTokenStatusCode);
        return request(app)
          .get('/users')
          .set({ token });
      })
      .then(response => {
        expect(response.statusCode).toBe(invalidTokenErrorCode);
      }));
});
