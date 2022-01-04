const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  createMovie,
  findMovies,
  deleteMovie,
} = require('../controllers/movies');
const { linkRegex } = require('../utils/regex');

router.get('/', findMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(linkRegex).required(),
    trailer: Joi.string().pattern(linkRegex).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(linkRegex).required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
