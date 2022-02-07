const AccessDeniedError = require('../errors/access-denied-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const Movie = require('../models/movie');
const {
  buildMovieCreationErrorMsg,
  MOVIE_NOT_FOUND_MSG,
  ANOTHER_USER_CARD_DELETE_MSG,
  WRONG_ID_FORMAT_MSG,
} = require('../utils/consts');

function findMovies(req, res, next) {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(buildMovieCreationErrorMsg(err));
      }
      throw err;
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MSG);
      }
      if (movie.owner._id.toString() !== req.user._id) {
        throw new AccessDeniedError(ANOTHER_USER_CARD_DELETE_MSG);
      }

      return Movie.deleteOne({ _id: movie._id });
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(WRONG_ID_FORMAT_MSG);
      }
      throw err;
    })
    .catch(next);
}

module.exports = {
  findMovies,
  createMovie,
  deleteMovie,
};
