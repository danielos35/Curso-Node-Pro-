const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());
/*
APP GET
- Argumento#1 = url a visitar 
- Argumento#2 = función a realizar cuando se entre a esa URL 
-- Callback argument#1: req, petición 
-- Callback argument#2: res, respuesta

*/

// app.get('/', (req, res) => {
//   // res.status(200).send('Bienvenido al servidor');
//   res.status(200).json({ mensaje: 'Bienvenido al servidor', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('Esta es una solicitud post');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Envio exitoso',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// Crear servidor
const port = 3000;
app.listen(port, () => {
  console.log(`App running in port ${port}`);
});