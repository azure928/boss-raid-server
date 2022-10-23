const errorHandler = (err, req, res, next) => {
  console.log('\x1b[33m%s\x1b[0m', err);
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;
