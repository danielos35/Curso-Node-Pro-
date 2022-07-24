const fs = require('fs');
const server = require('http').createServer();


server.on('request', (req, res) => {

    // Solution #1
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data)
    // })

    // Solution #2: streams
    // En este caso se pueden tener porblemas por contrapresión, pues el disco lee los archivos mas rapido de lo que los puede enviar 
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk)
    // })

    // readable.on('end', () => {
    //     res.end()
    // })

    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File no found');
    // })


    // Solution #3: manejar la cantidad de datos 
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res)
    // datosLeidos.pipe(DatosQueVanAserEscritos)
})


server.listen(3000)