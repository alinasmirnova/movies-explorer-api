const router = require('express').Router();
const validation = require('../middlewares/validation');
const {
  login,
  createUser,
  logout,
} = require('../controllers/users');

router.post('/signin', validation.signIn, login);
router.post('/signup', validation.signUp, createUser);
router.post('/signout', logout);

module.exports = router;
