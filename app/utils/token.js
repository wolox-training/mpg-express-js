const jwt = require('jsonwebtoken');
const { secret } = require('../../config').common.session;

exports.generateToken = payload => jwt.sign(payload, secret);

exports.validateToken = token => jwt.verify(token, secret);
