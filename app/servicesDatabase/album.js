const errors = require('../errors'),
  { album } = require('../models'),
  logger = require('../logger');

exports.findOneAlbum = data =>
  album
    .findOne({
      where: data
    })
    .catch(err => {
      logger.error(err.message);
      throw errors.databaseError(`Error finding album with the query ${JSON.stringify(data)} in database`);
    });

exports.createAlbum = albumToCreate =>
  album.create(albumToCreate).catch(err => {
    logger.error(err.message);
    throw errors.userSignupError('Error creating album in the database');
  });

exports.getAlbumsByUserId = userId =>
  album
    .findAll({
      attributes: ['id', 'title', 'userId'],
      where: {
        userId
      }
    })
    .catch(err => {
      logger.error(err.message);
      throw errors.userSignupError('Error findin albums by id in the database');
    });
