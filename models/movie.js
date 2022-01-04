const mongoose = require('mongoose');
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
      message: (props) => `${props.value} не является корректным URL`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
      message: (props) => `${props.value} не является корректным URL`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
      message: (props) => `${props.value} не является корректным URL`,
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
