const express = require('express');
const NotFoundError = require('../errors/not-found-error');

const router = express.Router();
const auth = require('../middlewares/auth');
const { RESOURCE_NOT_FOUND_MSG } = require('../utils/consts');

router.use(require('./auth'));

router.use(auth);
router.use(require('./users'));
router.use(require('./movies'));

router.use(() => { throw new NotFoundError(RESOURCE_NOT_FOUND_MSG); });

module.exports = router;
