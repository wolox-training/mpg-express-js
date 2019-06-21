// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', users.signUp);
};
