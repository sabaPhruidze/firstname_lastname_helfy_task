const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(err.status || 500).json({
    message: err.message || "servers error",
  });
};
module.exports = errorHandler;
