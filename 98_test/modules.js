
// Ver todos los argumentos que contiene la función
// console.log(arguments);

console.log(require('module').wrapper);


// Importar modulos
const Calculadora = require('./test-module-1');
const calcOne = new Calculadora();
console.log(calcOne.add(1, 2));


// Exportar modulos #1
// const calcTwo = require('./test-module-2');
// console.log(calcTwo.add(1, 2));

// Exportar modulos #1
const { add, multiply, divide } = require('./test-module-2');
console.log(add(1, 2));
console.log(multiply(1, 2));
console.log(divide(1, 2));
