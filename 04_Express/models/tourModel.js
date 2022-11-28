const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const user = require('./userModel')

// Esquema para mongoose
const tourSchema = new mongoose.Schema(
  {
    /*
    
     VALIDACIONES CON LIBRERIAS
     - Libreria de validaciones: validator -> https://github.com/validatorjs/validator.js/
    
    */

    name: {
      type: String,
      required: [true, 'El tour debe tener un nombre'],
      unique: true,
      trim: true,
      maxlength: [40, 'El nombre del tour debe tener menos de 40 caracteres'],
      minlength: [10, 'El nombre del tour debe de tener mas de 10 caracteres'],
      // Validación con libreria validator
      validate: [
        validator.isAlpha,
        'El nombre del tour solo debe contener letras',
      ],
    },
    slug: String,
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
      enum: {
        values: ['facil', 'medio', 'dificil'],
        message: 'Las dificultades posibles son facil, medio o dificil',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'El valor minimo debe de ser de 1'],
      max: [5, 'El valor maximo debe de ser de 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },

    /*
     CUSTOM VALIDATION
     - Si retorna true será un valor valido, si retorna false será un valor invalido
     - Con this podemos acceder a todos los demas valores que vienen en el objeto
     - This solo apunta a los valores que se ingresan en la petición, no funciona con valores a actualizar
     - Se recomienda usa THIS solo en la creación de documento
    */

    priceDiscount: {
      type: Number,
      validate: {
        message: 'El valor ingresado ({VALUE}) tiene que ser menor al precio',
        validator: function (valorIngresado) {
          return valorIngresado < this.price;
        },
      },
    },
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
    secretTour: {
      type: Boolean,
      default: false,
    },

    // Mongo permite manejar datos geoespaciales de manera sencilla, mediante un formato llamado GeoJSON https://geojson.io/

    startLocation: {
      // GeoJSON
      type:{
        type:String,
        default: 'Point',
        enum: ['Point']
      }, 
      coordinate:[Number],
      address: String, 
      description: String
    }, 

    locations: [
      {
        type:{
          type: String, 
          default: 'Point', 
          enum: ['Point']
        },
        coordinate:[Number],
        address: String, 
        description: String,
        day:Number
      }
    ], 
    guides: [
      {
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
      }
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});


// Virtual populate
tourSchema.virtual('reviews', {
  ref: 'Review', 
  foreignField: 'tour',
  localField: '_id'
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lowe: true });
  next();
});

/*
GUARDADO DE DATOS INCRUSTADOS
El siguiente codigo es SOLO para guardado de datos por incrustación
*/

// tourShema.pre('save', async function(next){
//   const guidesPromises = this.guides.map( async (id) => await user.findById(id));
  
//   // Metodo para esperar multiples promesas
//   this.guides = await Promise.all(guidesPromises); 
// })

tourSchema.pre('save', function (next) {
  // console.log('Guardando documentos');
  next();
});

tourSchema.post('save', function (doc, next) {
  // console.log(doc);
  next();
});

// Query Middleware

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});


// Para hacer el caracter de acento circunflejo se utiliza alt + 94 ^ 

tourSchema.pre( /^find/, function( next ){
  this.populate(
    
    //Podemos pasar un objeto de configuración donde la llave path es el nombre del elemento y select los elementos que queremos eliminar con la preposición - 
    {
    path:'guides', 
    select:'-__v -email'
    }
  );
  next();
})

tourSchema.post(/^find/, function (docs, next) {
  // console.log(`Hecho en ${Date.now() - this.start}`);
  // console.log(docs);
  next();
});


// AGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next){
  this.pipeline().unshift({ $match: { secretTour: { $ne:true }}})
  // console.log(this.pipeline); 
  next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
