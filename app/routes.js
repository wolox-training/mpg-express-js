const { checkSchema } = require('express-validator');

const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/album'),
  users = require('./controllers/user'),
  { signUpDataValidator } = require('./middlewares/user'),
  { userSignUpSchema } = require('./utils/schemasValidators/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albums.findAll);
  app.get('/albums/:id/photos', albums.findPhotosById);
  app.post('/users', [checkSchema(userSignUpSchema), signUpDataValidator], users.signUp);
};
