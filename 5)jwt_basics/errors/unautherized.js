
const { StatusCodes } = require('http-status-codes');
const customapierror = require('./customapierror');

class UnauthenticatedError extends customapierror {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthenticatedError;