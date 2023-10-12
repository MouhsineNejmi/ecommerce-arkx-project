const errorHanlderMiddleware = (err, req, res, next) => {
  console.log(`Error ${err.message}`);

  const status = err.status || 400;

  res.status(status).json({
    status: status,
    message: err.message,
  });
};

module.exports = errorHanlderMiddleware;
