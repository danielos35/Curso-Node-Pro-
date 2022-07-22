/*
EVENT LOOP

-  Es el lugar donde se guarda el codigo asincrono esperando a ser ejecutado en el callback


*/


const fs = require('fs');

setTimeout(() => {
    console.log('Timer #1 finalizado');
}, 0);


setImmediate(() => console.log('Ejecución inmediata #1 Finalzida'));


fs.readFile('test-file.txt', () => {
    console.log('I/O Finalizado');
})

console.log('Hello from the top-level code');