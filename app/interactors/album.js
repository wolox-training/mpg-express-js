const { findOneAlbum, createAlbum, getAlbumsByUserId } = require('../servicesDatabase/album'),
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

exports.albumList = (userId, loggedUser) => {
  if (loggedUser.id !== userId && !loggedUser.isAdmin) {
    throw errors.userPermissionsError(
      `The user have not permission to get albums purchased by user ${userId}`
    );
  }
  return getAlbumsByUserId(userId).then(albums => albums);
};
