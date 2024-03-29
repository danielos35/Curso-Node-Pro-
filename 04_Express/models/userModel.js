const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese un nombre de usuario'],
  },
  email: {
    type: String,
    required: [true, 'Indica un correo valido'],
    unique: [true, 'El correo electronico ya se encuenrta logeado'],
    lowercase: true,
    validate: [validator.isEmail, 'Ingrese un correo valido'],
  },
  photo: String,

  // NUNCA ALMACENAR LAS CONTRASENAS EN TEXTO PLANO, SIEMPRE ENCRIPTAR
  password: {
    type: String,
    required: [true, 'Ingrese una contraseña'],
    minlength: 8,
    // Al colocar select false no sé muestra los datos
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Ingrese la confirmación de la contraseña'],
    validate: {
      // SOLO FUNCIONA EN EL GUARDADO o la creación DE LA INFORMACIÓN
      validator: function (el) {
        return el === this.password;
      },
      message: 'Las contraseñas ingresadas no coinciden',
    },
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function (next) {
  // Solo cuando se crea el usuario
  if (!this.isModified('password')) return next();

  // cifrado y uso de CPU
  this.password = await bcrypt.hash(this.password, 12);

  // Borrar confirmación de contraseña
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword,userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  
  if(this.passwordChangedAt){
    console.log(this.passwordChangedAt, JWTTimestamp);
  }
  
  return false
}

const User = mongoose.model('User', userSchema);
module.exports = User;
