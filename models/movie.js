const mongoose = require('mongoose');
const { buildInvalidUrlMsg } = require('../utils/consts');
const { linkRegex } = require('../utils/regex');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
      message: (props) => buildInvalidUrlMsg(props.value),
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
      message: (props) => buildInvalidUrlMsg(props.value),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
      message: (props) => buildInvalidUrlMsg(props.value),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
