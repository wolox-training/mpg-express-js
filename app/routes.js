const { healthCheck } = require('./controllers/healthCheck');
const albums = require('./controllers/album');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albums.findAll);
  app.get('/albums/:id/photos', albums.findPhotosById);
};
