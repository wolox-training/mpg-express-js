const externalApi = require('../services/album'),
  errors = require('../errors');

exports.findAll = (req, res, next) =>
  externalApi
    .findAlbums()
    .then(response => res.status(200).send(response))
    .catch(next);

exports.findPhotosById = (req, res, next) => {
  const albumId = req.params.id;
  if (isNaN(albumId)) {
    return next(errors.invalidParameterError('The album Id is not a valid number'));
  }
  return externalApi
    .findPhotosByAlbumId(albumId)
    .then(response => res.status(200).send(response))
    .catch(next);
};
