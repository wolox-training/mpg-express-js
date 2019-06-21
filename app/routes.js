const { healthCheck } = require('./controllers/healthCheck');
const albums = require('./controllers/album');
const users = require('./controllers/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albums.findAll);
  app.get('/albums/:id/photos', albums.findPhotosById);
  app.post('/users', users.signUp);
};
