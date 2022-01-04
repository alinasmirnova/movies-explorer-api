const express = require('express');
const validation = require('../middlewares/validation');

const router = express.Router();
const {
  findCurrentUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', findCurrentUser);
router.patch('/me', validation.updateUser, updateUser);

module.exports = express.Router().use('/users', router);
