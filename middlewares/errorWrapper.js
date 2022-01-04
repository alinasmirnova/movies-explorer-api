const { ERROR, buildServerErrorMsg } = require('../utils/consts');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR
        ? buildServerErrorMsg(err)
        : message,
    });
  next();
};
