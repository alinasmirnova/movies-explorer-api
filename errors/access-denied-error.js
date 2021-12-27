const { ACCESS_DENIED } = require('../utils/consts');

class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ACCESS_DENIED;
  }
}

module.exports = AccessDeniedError;
