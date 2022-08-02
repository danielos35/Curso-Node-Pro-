const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARE....................................................

// condicionar mediante variables de entorno
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Middleware personalizado
app.use((req, res, next) => {
  console.log('Hola desde el middlwware');
  next();
});

// Middleware para manipular la data
app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;
