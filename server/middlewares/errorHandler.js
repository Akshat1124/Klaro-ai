// Centralized error handler
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;
  res.status(status).json({ message, stack });
};
