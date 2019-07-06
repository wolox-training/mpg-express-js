const { findOneAlbum, createAlbum } = require('../servicesDatabase/album'),
  { findAlbumById } = require('../services/album'),
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
