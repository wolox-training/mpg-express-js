const request = require('supertest'),
  { factory } = require('factory-girl');

const app = require('../app.js');

const getAlbumsPhotosStatusCode = 200,
  getPhotosErrorStatusCode = 409,
  validPassword = 'myPassword123',
  validEmail = 'dummy.user@wolox.co',
  albumId = 1,
  invalidAlbumId = 2,
  photosLength = 4;

describe('GET /users/albums/:id/photos', () => {
  beforeEach(() =>
    factory
      .create('user', {
        email: validEmail,
        password: validPassword
      })
      .then(userCreated => factory.create('album', { id: albumId, userId: userCreated.id }))
  );

  test('Should get list of photos by album id successfully', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response =>
        request(app)
          .get(`/users/albums/${albumId}/photos`)
          .set({ token: response.body.token })
      )
      .then(response => {
        expect(response.statusCode).toBe(getAlbumsPhotosStatusCode);
        expect(response.body.photos).toHaveLength(photosLength);
      }));
  test('Should not get list of photos of an album no purchased', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response =>
        request(app)
          .get(`/users/albums/${invalidAlbumId}/photos`)
          .set({ token: response.body.token })
      )
      .then(response => {
        expect(response.statusCode).toBe(getPhotosErrorStatusCode);
      }));
});
