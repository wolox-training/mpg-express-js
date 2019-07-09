const externalApi = require('../services/album'),
  { getAlbumsByUserId } = require('../servicesDatabase/album'),
  errors = require('../errors'),
  logger = require('../logger'),
  { buyAlbum, getPhotosByAlbumId } = require('../interactors/album'),
  { albumSerializer, photosListSerializer, albumListSerializer } = require('../serializers/album');

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
    { id: userId } = req.session;
  return buyAlbum(userId, albumId)
    .then(purchasedAlbum => {
      logger.info(`The album ${purchasedAlbum.title} was purchased successfully`);
      return res.status(200).send({ album: albumSerializer(purchasedAlbum) });
    })
    .catch(next);
};

exports.purchasedAlbums = (req, res, next) => {
  const { user_id: userId } = req.params;
  return getAlbumsByUserId(userId)
    .then(albums => {
      logger.info(`Albums of the user ${userId} were found successfully`);
      return res.status(200).send({ albums: albumListSerializer(albums) });
    })
    .catch(next);
};

exports.photosByAlbumId = (req, res, next) => {
  const loggedUser = { ...req.session },
    { id: albumId } = req.params;
  return getPhotosByAlbumId(loggedUser, albumId)
    .then(photos => {
      logger.info('Photos by album ID were obtained correctly');
      return res.status(200).send({ photos: photosListSerializer(photos) });
    })
    .catch(next);
};
