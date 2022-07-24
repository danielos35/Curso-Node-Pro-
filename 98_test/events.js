const EventEmitter = require('events');
const http = require('http')
// const myEmitter = new EventEmitter();

// Event emmiter para JavaScript es una clase

class Sales extends EventEmitter {

    constructor() {
        super()
    }

}

const myEmitter = new Sales();


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

// myEmitter('newSale'); 


/////////////////////////

const server = http.createServer();
server.on('request', (req, res) => {
    console.log('Recived Request');
    res.end('Recived Request')
})


server.on('close', (req, res) => {
    console.log('Recived Request');
    res.end('Recived Request')
})


server.listen(3000)