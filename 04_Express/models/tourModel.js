const mongoose = require('mongoose');

// Esquema para mongoose
const tourShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El tour debe tener un nombre'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'El tour debe tener una duración'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'El tour debe de tener un numero de personas'],
  },
  difficulty: {
    type: String,
    required: [true, 'El tour debe tener una dificultad'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'El resumen del tour es requerido'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'El tour debe tener una imagen'],
  },
  image: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourShema);

module.exports = Tour;
