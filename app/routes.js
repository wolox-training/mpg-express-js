const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/album'),
  users = require('./controllers/user'),
  userDataValidator = require('./middlewares/userDataValidator'),
  { userSignUpSchema } = require('./utils/schemasValidators/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albums.findAll);
  app.get('/albums/:id/photos', albums.findPhotosById);
  app.post('/users', [userDataValidator(userSignUpSchema)], users.signUp);
};
