const http = require('http'); 
const url = require('url'); 



/*
Crear servidor 
- Argumento #1: req (solicitud); 
- Argumento #2: res (respuesta)
*/

const server = http.createServer((req,res)=>{

    console.log(req.url);
    // console.log(req);
    // console.log(res);
    
    const pathName = req.url;
    if(pathName === '/holaMundo'){
        res.end('Bienvenido al servidor');
    }else if(pathName === '/' ||pathName === '/test'){
        res.end('este es un test')
    }else{
        res.writeHead(404,{
            'Content-type': 'text/html',
            'encabezadoPropio': 'Hola mundo'
        })
        res.end('<h1>Que ruta tan extraña</h1>')
    }
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

/*
ENRUTAMIENTO
- Para el enrutamiento usamos el modulo URL
*/ 

