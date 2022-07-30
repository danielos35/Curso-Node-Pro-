const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getALLTours = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
