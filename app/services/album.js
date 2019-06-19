const config = require('../../config'),
  request = require('request-promise'),
  errors = require('../errors'),
  logger = require('../logger');

exports.findAlbums = () =>
  request({ uri: `${config.common.external_api_url}/albums`, json: true }).catch(err => {
    logger.error(err.message);
    throw errors.externalApiError('Error consuming external API');
  });

exports.findPhotosByAlbumId = albumId =>
  request({ uri: `${config.common.external_api_url}/photos?albumId=${albumId}`, json: true }).catch(err => {
    logger.error(err.message);
    throw errors.externalApiError('Error consuming external API');
  });
