const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/album'),
  users = require('./controllers/user'),
  schemaValidator = require('./middlewares/schemaValidator'),
  { userSignUpSchema } = require('./utils/schemasValidators/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albums.findAll);
  app.get('/albums/:id/photos', albums.findPhotosById);
  app.post('/users', [schemaValidator(userSignUpSchema)], users.signUp);
  app.post('/users/sessions', [schemaValidator(userSignUpSchema)], users.signIn);
};
