// utils/errors.js
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || "GENERIC_ERROR";
    this.isOperational = true;
  }
}

// Common errors with predefined status codes
const NotFoundError = (message) =>
  new AppError(message || "Resource not found", 404, "NOT_FOUND");
const ValidationError = (message) =>
  new AppError(message || "Validation failed", 400, "VALIDATION_ERROR");
const ServerError = (message) =>
  new AppError(message || "Internal server error", 500, "SERVER_ERROR");

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  ServerError,
};
