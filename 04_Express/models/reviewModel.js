const mongoose = require('mongoose');

const reviewSchema =  new mongoose.Schema( {

    review: {
        type: String, 
        require: [true, 'Debes de ingresar una review']
    }, 

    rating: {
        type: Number,
        min:1, 
        max:5, 
        require: [true, 'Debes de ingresar una review']
    }, 
    
    createdAt: {
        type: Date, 
        default: Date.now(),
    },

    tour:{
            type: mongoose.Schema.ObjectId, 
            ref: 'Tour', 
            require: [true, 'La review debe contener un tour']
        }, 
        
        
        // Para un solo dato definimos las propiedades dentro de un objeto
    user: {
        type:mongoose.Schema.ObjectId, 
        ref: 'User',
        require: [true, 'La review debe un usuario']
    },
}, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
)


reviewSchema.pre( /^find/, function( next ){
    this.populate(
      
      //Podemos pasar un objeto de configuración donde la llave path es el nombre del elemento y select los elementos que queremos eliminar con la preposición - 
      {
      path:'user'
      }
    );
    next();
  })
  
    
const review = mongoose.model('Review', reviewSchema);
module.exports = review;
