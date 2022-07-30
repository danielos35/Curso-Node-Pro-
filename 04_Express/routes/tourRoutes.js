const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const router = express.Router();

const getALLTours = (req, res) => {
  console.log(req.requesTime);
  res.status(200).json({
    status: 'Envio exitoso',
    requestedAt: req.requesTime,
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

router.route('/').get(getALLTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
