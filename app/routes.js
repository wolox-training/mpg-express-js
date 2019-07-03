const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/album'),
  users = require('./controllers/user'),
  schemaValidator = require('./middlewares/schemaValidator'),
  { authenticate } = require('./middlewares/userAuthentication'),
  { userSignUpSchema, userSignInSchema } = require('./utils/schemasValidators/user');

const authAdmin = true;

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albums.findAll);
  app.get('/albums/:id/photos', albums.findPhotosById);
  app.post('/users', [schemaValidator(userSignUpSchema)], users.signUp);
  app.post('/admin/users', [schemaValidator(userSignUpSchema), authenticate(authAdmin)], users.signUpAdmin);
  app.post('/users/sessions', [schemaValidator(userSignInSchema)], users.signIn);
  app.get('/users', [authenticate()], users.getUsers);
};
