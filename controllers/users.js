const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const User = require('../models/user');
const {
  USER_NOT_FOUND_MSG,
  buildUserCreationErrorMsg,
  buildUserEditingErrorMsg,
  USER_EXISTS_MSG,
  EMAIL_ALREADY_EXISTS_MSG,
} = require('../utils/consts');

const { NODE_ENV, JWT_SECRET } = process.env;

function findCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MSG);
      }
      return res.send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  function hidePassword(user) {
    const { password, ...responseUser } = user;
    return responseUser;
  }

  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send(hidePassword(user._doc)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(buildUserCreationErrorMsg(err));
      }
      if (err.code === 11000) {
        throw new ConflictError(USER_EXISTS_MSG);
      }

      throw err;
    })
    .catch(next);
}

function updateUser(req, res, next) {
  const id = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MSG);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictError(EMAIL_ALREADY_EXISTS_MSG);
      }
      if (err.name === 'ValidationError') {
        throw new BadRequestError(buildUserEditingErrorMsg(err));
      }
      throw err;
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      }).end();
    })
    .catch((err) => {
      throw new UnauthorizedError(err.message);
    })
    .catch(next);
}

function logout(req, res) {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
    sameSite: 'Strict',
  }).end();
}

module.exports = {
  findCurrentUser,
  createUser,
  updateUser,
  login,
  logout,
};
