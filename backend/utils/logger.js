// Simple logging utility
const logger = {
  info: (message) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  },

  error: (message, error) => {
    console.error(
      `[ERROR] ${new Date().toISOString()} - ${message}`,
      error || ""
    );
  },

  warn: (message) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  },

  debug: (message, data) => {
    if (process.env.DEBUG === "true") {
      console.log(
        `[DEBUG] ${new Date().toISOString()} - ${message}`,
        data || ""
      );
    }
  },
};

module.exports = logger;
