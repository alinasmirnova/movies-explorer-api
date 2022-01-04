const { celebrate, Joi } = require('celebrate');
const express = require('express');

const router = express.Router();
const {
  findCurrentUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', findCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().optional().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = express.Router().use('/users', router);
