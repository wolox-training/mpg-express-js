const request = require('supertest'),
  { factory } = require('factory-girl');

const app = require('../app.js'),
  { encryptPassword } = require('../app/utils/userValidations');

const getUsersStatusCode = 200,
  getUsersNoAuthErrorCode = 401,
  validPassword = 'myPassword123',
  validEmail = 'dummy.user@wolox.co';

describe('GET /users', () => {
  beforeEach(done =>
    factory
      .create('user', {
        email: validEmail,
        password: encryptPassword(validPassword).then(password => password)
      })
      .then(() => done())
  );

  test('Get users successfully', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response =>
        request(app)
          .get('/users')
          .set({ token: response.body.token })
      )
      .then(response => {
        expect(response.statusCode).toBe(getUsersStatusCode);
        expect(response.body).toHaveProperty('users');
      }));
  test('Get users with a sign in user but no token sent in the request', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(() => request(app).get('/users'))
      .then(response => {
        expect(response.statusCode).toBe(getUsersNoAuthErrorCode);
      }));
  test('Get users with a sign in user but invalid token sent in the request', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response =>
        request(app)
          .get('/users')
          .set({ token: `${response.body.token}1` })
      )
      .then(response => {
        expect(response.statusCode).toBe(getUsersNoAuthErrorCode);
      }));
  test('Get users successfully with page size of 5', () =>
    factory.createMany('user', 4).then(() =>
      request(app)
        .post('/users/sessions')
        .send({ email: validEmail, password: validPassword })
        .then(response =>
          request(app)
            .get('/users?pageSize=3')
            .set({ token: response.body.token })
        )
        .then(response => {
          expect(response.statusCode).toBe(getUsersStatusCode);
          expect(response.body).toHaveProperty('users');
          expect(response.body.users.length).toBe(3);
        })
    ));
  test('Get page 2 of users successfully with page size of 2', () =>
    factory.createMany('user', 4).then(() =>
      request(app)
        .post('/users/sessions')
        .send({ email: validEmail, password: validPassword })
        .then(response =>
          request(app)
            .get('/users?pageSize=2&page=2')
            .set({ token: response.body.token })
        )
        .then(response => {
          expect(response.statusCode).toBe(getUsersStatusCode);
          expect(response.body).toHaveProperty('users');
          expect(response.body.users.length).toBe(2);
          expect(response.body.page).toBe('2');
        })
    ));
});
