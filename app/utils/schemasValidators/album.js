const errors = require('../../constants/errors');

exports.buyAlbumSchema = {
  id: {
    in: ['params'],
    isInt: {
      errorMessage: errors.INVALID_ALBUM_ID_ERROR_MSG
    },
    toInt: true
  }
};

exports.purchasedAlbumsSchema = {
  user_id: {
    in: ['params'],
    isInt: {
      errorMessage: errors.INVALID_USER_ID_ERROR_MSG
    },
    toInt: true
  }
};

exports.photosByAlbumSchema = {
  id: {
    in: ['params'],
    isInt: {
      errorMessage: errors.INVALID_ALBUM_ID_ERROR_MSG
    },
    toInt: true
  }
};
