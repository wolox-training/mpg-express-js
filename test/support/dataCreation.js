const { factory } = require('factory-girl');

const { user } = require('../../app/models'),
  { encryptPassword } = require('../../app/utils/userValidations');

factory.define(
  'user',
  user,
  {
    name: factory.chance('first'),
    lastname: factory.chance('last'),
    email: factory.chance('email', { domain: 'wolox.co' }),
    password: factory.chance('string', { length: 10 }),
    is_admin: false
  },
  {
    afterCreate: model =>
      encryptPassword(model.password).then(password => {
        model.password = password;
        return model.save();
      })
  }
);
