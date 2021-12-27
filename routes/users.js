const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
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

module.exports = router;
