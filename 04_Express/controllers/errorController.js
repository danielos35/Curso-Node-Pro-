const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalido  ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleTokenExpiredError = (err) => {
  return new AppError('El token expiró', 401);
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('HUBO UN ERROR');
    res.status(500).json({
      status: 'Error',
      message: 'Algo no funcionó correctamente',
    });
  }
};

const handleJWTError = () => new AppError('Invalid toke. Please login againpos')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    console.log(err.name);
    sendErrorDev(err, res);
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if(err.name === 'JsonWebTokenError') error = handleJWTError(err)
    if(err.name === 'TokenExpiredError') error = handleTokenExpiredError(err);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    console.log(err.name);
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if(err.name === 'JsonWebTokenError') error = handleJWTError(err)
    if(err.name === 'TokenExpiredError') error = handleTokenExpiredError(err);
    sendErrorProd(error, res);
  }
};
