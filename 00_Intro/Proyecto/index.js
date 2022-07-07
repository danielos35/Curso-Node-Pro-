const fs =  require('fs'); 

/*
Leer archivos de forma sincrona 
*/
const text = fs.readFileSync('./txt/input.txt', 'utf-8'); 
console.log(text);

// Escribir en archivos 
const salida = `Este es un texto de ejemplo creado en ${new Date()}: ${text},`;
fs.writeFileSync('./txt/output.txt', salida); 
