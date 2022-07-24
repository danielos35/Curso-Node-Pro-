/*
STREAM 
-  Consiste en la transmisión de datos en tiempo real
-  Son la mejor manera de entregar grandes volumenes de datos
-  Optimiza el manejo de memoria pues no es necesario mantener todos los datos en esta


STREAM EN NODE JS
Los estreams en node js son instancias del clase EventEmitter 
- Tipos..........................

-- Readable streams 
--- Son aquellos en los que podemos consumir datos, por ejemplo una petición http 
--- Funciones
---- pipe()
---- read()

-- Writable streams 
--- Son aquellos en los que podemos escribir datos, por ejemplo una respuesta http 
--- Funciones
---- write()
---- end()

-- Duplex stream 
--- Son aquellos en los que podemos tanto escribir y leer información, por ejemplo los web sockets


-- Transform streams
---  Datos que pueden ser transformados en la lectura o la escritura, por ejemplo en la compresión de alguna información 

*/ 