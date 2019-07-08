const { mockAlbumDataResponse } = require('../mockData/album'),
  errors = require('../../app/errors');

module.exports = jest.fn(requestParams => {
  const idAlbum = requestParams.uri.split('/')[2];
  if (parseInt(idAlbum) > 0) {
    return Promise.resolve(mockAlbumDataResponse);
  }
  return Promise.reject(errors.externalApiError('Error consuming external API'));
});
