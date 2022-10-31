const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese un nombre de usuario'],
  },
  email: {
    type: String,
    required: [true, 'Indica un correo valido'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Ingrese un correo valido'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Ingrese una contraseña'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Ingrese la confirmación de la contraseña'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
