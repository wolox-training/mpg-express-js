const { findOneAlbum, createAlbum } = require('../servicesDatabase/album'),
  { findAlbumById, findPhotosByAlbumId } = require('../services/album'),
  errors = require('../errors'),
  logger = require('../logger');

exports.buyAlbum = (userId, albumId) =>
  findOneAlbum({ id: albumId, userId })
    .then(albumFound => {
      if (albumFound) {
        logger.error(`The album ${albumFound.title} was already purchased by the user`);
        throw errors.albumBuyError('The album was already purchased by the user');
      }
      return findAlbumById(albumId);
    })
    .then(album => {
      const albumToCreate = { id: album.id, title: album.title, userId };
      return createAlbum(albumToCreate);
    });

exports.getPhotosByAlbumId = (loggedUser, albumId) =>
  findOneAlbum({ id: albumId, userId: loggedUser.id }).then(album => {
    if (!album) {
      logger.error(`The album ${albumId} was not purchased by the user`);
      throw errors.getPhotosError('The album was not purchased by the user');
    }
    return findPhotosByAlbumId(albumId);
  });
