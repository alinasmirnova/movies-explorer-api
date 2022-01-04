const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/unauthorized-error');
const { INVALID_EMAIL_MSG, INVALID_EMAIL_OR_PASSWORD_MSG } = require('../utils/consts');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, INVALID_EMAIL_MSG],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findByEmail(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_MSG);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_MSG);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
