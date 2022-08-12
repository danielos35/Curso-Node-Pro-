// Configurar mongo
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Ruta de nuestro archivo de configuración (Debe estar antes de la importación de la app)
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlPArse: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Conectado de manera exitosa');
  });

const app = require('./app');

/* 
- Modulo del schema

const Tour = mongoose.model('Tour', tourShema);
const testTour = new Tour({
  name: 'The forest',
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('Este es un error', err);
  });

*/

// Ver entorno en el que nos encontramos
console.log(app.get('env'));

// Ver entornos de node
console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running in port ${port}`);
});