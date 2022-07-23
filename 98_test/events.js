const EventEmitter = require('events');

const myEmitter = new EventEmitter();


myEmitter.on('newSale', () => {
    console.log('Este es un nuevo evento #1');
})

myEmitter.on('newSale', () => {
    console.log('Este es un nuevo evento #2');
})

myEmitter.on('newSale', (num) => {
    console.log('Este es un nuevo evento #3', num);
})

myEmitter.emit('newSale', 9);

myEmitter('newSale'); 