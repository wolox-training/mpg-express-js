const config = require('../../config'),
  request = require('request-promise'),
  errors = require('../errors'),
  logger = require('../logger');

exports.findAlbums = () => {
  logger.info(`Consuming an external api with url: ${config.common.external_api_url}/albums`);
  return request({ uri: `${config.common.external_api_url}/albums`, json: true }).catch(err => {
    logger.error(err.message);
    throw errors.externalApiError('Error consuming external API');
  });
};

exports.findPhotosByAlbumId = albumId => {
  logger.info(
    `Consuming an external api with url: ${config.common.external_api_url}/photos?albumId=${albumId}`
  );
  return request({ uri: `${config.common.external_api_url}/photos?albumId=${albumId}`, json: true }).catch(
    err => {
      logger.error(err.message);
      throw errors.externalApiError('Error consuming external API');
    }
  );
};

exports.findAlbumById = id => {
  logger.info(`Consuming an external api with url: ${config.common.external_api_url}/albums/${id}`);
  return request({ uri: `${config.common.external_api_url}/albums/${id}`, json: true }).catch(err => {
    logger.error(err.message);
    throw errors.externalApiError('Error consuming external API');
  });
};
