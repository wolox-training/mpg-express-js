const jwt = require('jsonwebtoken');
const { secret } = require('../../config').common.session;

exports.generateToken = email => {
  const payload = { user: email };
  return jwt.sign(payload, secret);
};

exports.validateToken = token => {
  const decodedToken = jwt.verify(token, secret);
  return decodedToken;
};
