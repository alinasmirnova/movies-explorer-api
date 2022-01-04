const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { AUTH_REQUIRED_MSG } = require('../utils/consts');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError(AUTH_REQUIRED_MSG);
  }

  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(AUTH_REQUIRED_MSG);
  }
  req.user = payload;
  return next();
};
