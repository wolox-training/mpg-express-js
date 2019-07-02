const jwt = require('jsonwebtoken');
const { secret } = require('../../config').common.session;

exports.generateToken = email => jwt.sign({ user: email }, secret);

exports.validateToken = token => jwt.verify(token, secret);
