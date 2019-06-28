const jwt = require('jsonwebtoken');
const { privateKey } = require('../../config').common;

exports.generateToken = email => {
  const payload = { user: email };
  return jwt.sign(payload, privateKey);
};
