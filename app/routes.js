const { healthCheck } = require('./controllers/healthCheck'),
  albums = require('./controllers/album'),
  users = require('./controllers/user'),
  schemaValidator = require('./middlewares/schemaValidator'),
  { authenticate, validateAlbumIdPurchased } = require('./middlewares/userAuthentication'),
  { userSignUpSchema, userSignInSchema } = require('./utils/schemasValidators/user'),
  { buyAlbumSchema, purchasedAlbumsSchema, photosByAlbumSchema } = require('./utils/schemasValidators/album');

const authAdmin = true;

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', albums.findAll);
  app.get('/albums/:id/photos', albums.findPhotosById);
  app.post('/albums/:id', [schemaValidator(buyAlbumSchema), authenticate()], albums.buyById);
  app.post('/users', [schemaValidator(userSignUpSchema)], users.signUp);
  app.post('/admin/users', [schemaValidator(userSignUpSchema), authenticate(authAdmin)], users.signUpAdmin);
  app.post('/users/sessions', [schemaValidator(userSignInSchema)], users.signIn);
  app.get('/users', [authenticate()], users.getUsers);
  app.get(
    '/users/:user_id/albums',
    [schemaValidator(purchasedAlbumsSchema), authenticate(), validateAlbumIdPurchased],
    albums.purchasedAlbums
  );
  app.post('/users/sessions/invalidate_all', [authenticate()], users.invalidateAllSessions);
  app.get(
    '/users/albums/:id/photos',
    [schemaValidator(photosByAlbumSchema), authenticate()],
    albums.photosByAlbumId
  );
};
