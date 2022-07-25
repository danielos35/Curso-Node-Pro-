/*
PROMESAS
- Las promesas son valores futuros que seran retornados en cuanto estén listos 
*/

// Crear una promesa:

let esRechazada = true;
const promesaCustom = () => {
  return new Promise((resolve, reject) => {
    if (esRechazada) {
      return resolve('Promesa resuelta');
    } else {
      return reject('Promesa rechazada');
    }
  });
};

promesaCustom()
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  });

consumirData = async () => {
  try {
    let datos = await promesaCustom();
    console.log('Con nueva sintaxis', datos);
  } catch (error) {
    console.log('Con nueva sintaxis', error);
  }
};

consumirData();
