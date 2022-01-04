const { ERROR } = require('../utils/consts');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR
        ? `На сервере произошла ошибка: ${message}`
        : message,
    });
  next();
};
