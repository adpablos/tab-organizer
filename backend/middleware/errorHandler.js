// middleware/errorHandler.js
const logger = require("../utils/logger");

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function errorHandler(err, req, res, next) {
  // Log error
  logger.error(`${req.method} ${req.path} - ${err.message}`, err);

  // Set default values
  const statusCode = err.statusCode || 500;
  const code = err.code || "SERVER_ERROR";
  const message = err.isOperational ? err.message : "Internal server error";

  // Send response
  res.status(statusCode).json({
    error: {
      code,
      message,
    },
  });
}

module.exports = {
  asyncHandler,
  errorHandler,
};
