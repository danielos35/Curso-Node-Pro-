const fs =  require('fs'); 




// CODIGO BLOQUEANTE...........................................................

/*
Leer archivos de forma sincrona 
*/
const text = fs.readFileSync('./txt/input.txt', 'utf-8'); 
// console.log(text);

// Escribir en archivos 
const salida = `Este es un texto de ejemplo creado en ${new Date()}: ${text},`;
fs.writeFileSync('./txt/output.txt', salida); 


// CODIGO NO BLOQUEANTE 
fs.readFile('./txt/start.txt', 'utf-8', (err, data)=>{
    console.log(data);
})
