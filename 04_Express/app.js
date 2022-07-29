const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getALLTours = (req, res) => {
  res.status(200).json({
    status: 'Envio exitoso',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = +req.params.id;
  const tour = tours.find((ele) => ele.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Error',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'petición exitosa',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(400).json({
      status: 'Solicitud NO encontrada',
      data: {
        tour: '<error al actualizar el tour>',
      },
    });
  }

  res.status(200).json({
    status: 'Solicitud exitosa',
    data: {
      tour: '<URL Tour actualizado>',
    },
  });
};

const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(400).json({
      status: 'Solicitud NO encontrada',
      data: {
        tour: '<error al actualizar el tour>',
      },
    });
  }

  res.status(200).json({
    status: 'Solicitud exitosa',
    data: {
      tour: null,
    },
  });
};

// Lo mismo en diferente sintaxis
// app.get('/api/v1/tours', getALLTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getALLTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);


// Crear servidor
const port = 3000;
app.listen(port, () => {
  console.log(`App running in port ${port}`);
});
