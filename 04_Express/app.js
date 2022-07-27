const express = require('express');
const app = express();

/*
APP GET
- Argumento#1 = url a visitar 
- Argumento#2 = función a realizar cuando se entre a esa URL 
-- Callback argument#1: req, petición 
-- Callback argument#2: res, respuesta

*/

app.get('/', (req, res) => {
  // res.status(200).send('Bienvenido al servidor');
  res.status(200).json({ mensaje: 'Bienvenido al servidor', app: 'natours' });
});

app.post('/', (req, res) => {
  res.send('Esta es una solicitud post');
});

// Crear servidor
const port = 3000;
app.listen(port, () => {
  console.log(`App running in port ${port}`);
});
