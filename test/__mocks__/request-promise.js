const { mockAlbumDataResponse } = require('../mockData/album'),
  { mockPhotosDataResponse } = require('../mockData/photos'),
  errors = require('../../app/errors');

module.exports = jest.fn(requestParams => {
  const baseUrl =
    requestParams.uri.split('?').length > 1
      ? requestParams.uri.split('?')[0].split('/')[1]
      : requestParams.uri.split('/')[1];
  let idAlbum = 0;
  switch (baseUrl) {
    case 'albums':
      idAlbum = requestParams.uri.split('/')[2];
      if (parseInt(idAlbum) > 0) {
        return Promise.resolve(mockAlbumDataResponse);
      }
      break;
    case 'photos':
      idAlbum = requestParams.uri.split('?')[1].split('=')[1];
      if (parseInt(idAlbum) > 0) {
        return Promise.resolve(mockPhotosDataResponse);
      }
      break;
    default:
  }
  return Promise.reject(errors.externalApiError('Error consuming external API'));
});
