const externalApi = require('../services/album'),
  logger = require('../logger'),
  error = require('../errors');

exports.findAll = (req, res) =>
  externalApi
    .findAlbums()
    .then(response => res.status(200).send(response.data))
    .catch(err => {
      logger.info(err);
      res.status(500).send(error.defaultError(err.message));
    });

exports.findPhotosById = (req, res) => {
  const albumId = req.params.id;
  externalApi
    .findPhotosByAlbumId(albumId)
    .then(response => res.status(200).send(response.data))
    .catch(err => {
      logger.info(err);
      res.status(500).send(error.defaultError(err.message));
    });
};
