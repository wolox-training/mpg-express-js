const request = require('supertest'),
  { factory } = require('factory-girl');

const app = require('../app.js');

const getAlbumsStatusCode = 200,
  noPermissionsErrorCode = 401,
  validPassword = 'myPassword123',
  validEmail = 'dummy.user@wolox.co',
  otherValidPassword = 'myPassword123',
  otherValidEmail = 'otherdummy.user@wolox.co',
  albumsLength = 5;

describe('GET /users/:user_id/albums', () => {
  beforeEach(() =>
    factory
      .create('user', {
        email: validEmail,
        password: validPassword
      })
      .then(userCreated => factory.createMany('album', albumsLength, { userId: userCreated.id }))
  );

  test('Should get own albums successfully', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response =>
        request(app)
          .get('/users/1/albums')
          .set({ token: response.body.token })
      )
      .then(response => {
        expect(response.statusCode).toBe(getAlbumsStatusCode);
        expect(response.body.albums).toHaveLength(albumsLength);
      }));
  test('Should not allow to get albums from other users successfully (no admin user)', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response =>
        request(app)
          .get('/users/2/albums')
          .set({ token: response.body.token })
      )
      .then(response => {
        expect(response.statusCode).toBe(noPermissionsErrorCode);
      }));
  test('Should allow to get albums from other users successfully (admin user)', () =>
    factory
      .create('user', {
        email: otherValidEmail,
        password: otherValidPassword,
        isAdmin: true
      })
      .then(() =>
        request(app)
          .post('/users/sessions')
          .send({ email: otherValidEmail, password: otherValidPassword })
          .then(response =>
            request(app)
              .get('/users/1/albums')
              .set({ token: response.body.token })
          )
          .then(response => {
            expect(response.statusCode).toBe(getAlbumsStatusCode);
            expect(response.body.albums).toHaveLength(albumsLength);
          })
      ));
});
