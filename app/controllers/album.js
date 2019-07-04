const externalApi = require('../services/album'),
  errors = require('../errors'),
  logger = require('../logger'),
  { buyAlbum } = require('../interactors/album'),
  { albumSerializer } = require('../serializers/album');

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

exports.buyById = (req, res, next) => {
  const albumId = req.params.id,
    { user } = req.session;
  return buyAlbum(user, albumId)
    .then(purchasedAlbum => {
      logger.info(`The album ${purchasedAlbum.title} was purchased successfully`);
      return res.status(200).send({ purchased_album: albumSerializer(purchasedAlbum) });
    })
    .catch(next);
};
