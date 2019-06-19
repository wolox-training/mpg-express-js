const config = require('../../config'),
  axios = require('axios');

exports.findAlbums = () => axios.get(`${config.common.external_api_url}/albums`);
exports.findPhotosByAlbumId = albumId =>
  axios.get(`${config.common.external_api_url}/photos?albumId=${albumId}`);
