const http = require('http'); 


/*
Crear servidor 
- Argumento #1: req (solicitud); 
- Argumento #2: res (respuesta)
*/

const server = http.createServer((req,res)=>{
    console.log(req);
    console.log(res);
    res.end('Bienvenido al servidor');
})

/*
Configurar puerto
- Argumento #1: Puerto al que nos vamos a conectar.
- Argumento #2: LocalHost o puerto que se debe de escuchar.
- Argumento #3: callback que se ejecuta al hacer una solicitud.
*/
server.listen(3000,'127.0.0.1',()=>{
    console.log('escuchando');
});