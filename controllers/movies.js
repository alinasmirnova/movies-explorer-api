const AccessDeniedError = require('../errors/access-denied-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const Movie = require('../models/movie');

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
        throw new BadRequestError(`Переданы неверные данные для создания фильма: ${err.message}`);
      }
      throw err;
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner._id.toString() !== req.user._id) {
        throw new AccessDeniedError('Нельзя удалять фильмы других пользователей');
      }

      return Movie.deleteOne({ id: movie._id });
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Неверный формат id фильма');
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
