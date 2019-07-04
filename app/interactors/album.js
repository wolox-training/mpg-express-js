const { findOneAlbum, createAlbum } = require('../servicesDatabase/album'),
  { findAlbumById } = require('../services/album'),
  { findUserByEmail } = require('../servicesDatabase/user'),
  errors = require('../errors'),
  logger = require('../logger');

exports.buyAlbum = (userEmail, albumId) => {
  if (isNaN(albumId)) {
    throw errors.invalidParameterError('The album Id is not a valid number');
  }
  let userId = 0;
  return findUserByEmail(userEmail)
    .then(user => {
      userId = user.id;
      return findOneAlbum({ id: albumId, userId });
    })
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
};
