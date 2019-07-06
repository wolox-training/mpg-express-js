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
