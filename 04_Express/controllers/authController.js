const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken =  id => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id); 

  res.status(201).json({
    status: 'Solicitud exitosa',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Verificar si email y contraseña existen
  if (!email || !password) {
    next(new AppError('Por favor ingresa un email y una contraseña', 400));
  }

  // 2. verificar si el usuario existe y la contraseña es correcta
  const user = await User.findOne({ email }).select('+password');


  if(!user || !(await user.correctPassword(password, user.password))){
    return next(new AppError('Contraseña y/o correo incorrectos',401));
  }

  // 3. Si todo es OK, enviar un token al cliente
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync( async (req, res, next) => {

  //1. Traer token y verificar su correcto funcionamiento
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next(new AppError('No estás logeado en la aplicación',401));
  }

  // 2. Validar el token 
    // Todo lo que está dentro de promisify es una función que delvolverá una promesa
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET); 
  console.log(decode);

  // 3. verificar si el usuario existe
  

  // 4. Verificar si el usuario cambió la contraseña
  next();
})