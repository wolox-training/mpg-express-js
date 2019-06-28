const jwt = require('jsonwebtoken');
const { secret } = require('../../config').common.session;

exports.generateToken = email => {
  const payload = { user: email };
  return jwt.sign(payload, secret);
};
