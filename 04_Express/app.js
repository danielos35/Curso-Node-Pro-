const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARE....................................................

// condicionar mediante variables de entorno
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Middleware personalizado
app.use((req, res, next) => {
  next();
});

// Middleware para manipular la data
app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Manejar solicitudes inexistentes, (Rutas desconocidas)
app.all('*', (req, res, next) => {
  next(new AppError(`No pudimos encontrar ${req.originalUrl}`, 404));
});

/*
Manejo de errores
- Para identificarlo debemos enviarle cuatro argumentos, automaticamente reconocerá que es un middleware de error
*/

app.use(globalErrorHandler);

module.exports = app;
