const request = require('supertest'),
  { factory } = require('factory-girl');

const app = require('../app.js');

const validEmail = 'dummy.user@wolox.co',
  validPassword = 'password1234',
  albumId = 1,
  invalidAlbumId = -1,
  userId = 1,
  albumPurchasedStatusCode = 200,
  albumAlreadyPurchasedCode = 409,
  invalidAlbumIdCode = 500;

describe('POST /albums/:id', () => {
  beforeEach(() =>
    factory.create('user', {
      email: validEmail,
      password: validPassword
    })
  );

  test('Should buy an album successfully', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response =>
        request(app)
          .post(`/albums/${albumId}`)
          .set({ token: response.body.token })
      )
      .then(response => {
        expect(response.statusCode).toBe(albumPurchasedStatusCode);
      }));
  test('Should no allow to buy an album already purchased', () =>
    factory
      .create('album', {
        id: albumId,
        userId
      })
      .then(() =>
        request(app)
          .post('/users/sessions')
          .send({ email: validEmail, password: validPassword })
          .then(response =>
            request(app)
              .post(`/albums/${albumId}`)
              .set({ token: response.body.token })
          )
          .then(response => {
            expect(response.statusCode).toBe(albumAlreadyPurchasedCode);
          })
      ));
  test('Should no allow to buy an album with invalid album Id', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: validEmail, password: validPassword })
      .then(response =>
        request(app)
          .post(`/albums/${invalidAlbumId}`)
          .set({ token: response.body.token })
      )
      .then(response => {
        expect(response.statusCode).toBe(invalidAlbumIdCode);
      }));
});
