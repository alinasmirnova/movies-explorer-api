const express = require('express');
const NotFoundError = require('../errors/not-found-error');

const router = express.Router();
const auth = require('../middlewares/auth');

router.use(require('./auth'));

router.use(auth);
router.use(require('./users'));
router.use(require('./movies'));

router.use(() => { throw new NotFoundError('Ресурс не найден'); });

module.exports = router;
