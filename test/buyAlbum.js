jest.mock('request-promise');

const request = require('supertest'),
  { factory } = require('factory-girl'),
  mockRequestPromise = require('request-promise');

const app = require('../app.js'),
  errors = require('../app/errors');

const { mockAlbumDataResponse } = require('./mockData/album');

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
  mockRequestPromise.mockImplementation(requestParams => {
    const idAlbum = requestParams.uri.split('/')[2];
    if (parseInt(idAlbum) > 0) {
      return Promise.resolve(mockAlbumDataResponse);
    }
    return Promise.reject(errors.externalApiError('Error consuming external API'));
  });

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
