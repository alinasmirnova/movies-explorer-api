const express = require('express');
const validation = require('../middlewares/validation');

const router = express.Router();
const {
  createMovie,
  findMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', findMovies);
router.post('/', validation.createMovie, createMovie);
router.delete('/:id', validation.deleteMovie, deleteMovie);

module.exports = express.Router().use('/movies', router);
