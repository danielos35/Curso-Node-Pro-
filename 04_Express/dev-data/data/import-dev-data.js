const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('./../../models/tourModel');

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

// Leer JSON
const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));

// Importar datos
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Datos correctamente creados');
  } catch (err) {
    console.log(err);
  }
};

// Borrar todos los datos de la colleción
const deleteData = async () => {
  try {
    await Tour.deleteMany(tours);
    console.log('Datos correctamente creados');
  } catch (err) {
    console.log(err);
  }
};
