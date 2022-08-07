const Tour = require('./../models/tourModel');

exports.getALLTours = (req, res) => {
  console.log(req.requesTime);
  res.status(200).json({
    status: 'Envio exitoso',
    requestedAt: req.requesTime,
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = +req.params.id;
  // const tour = tours.find((ele) => ele.id === id);

  // res.status(200).json({
  //   status: 'petición exitosa',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  try {
    let newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Datos invalidos',
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Solicitud exitosa',
    data: {
      tour: '<URL Tour actualizado>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'Solicitud exitosa',
    data: {
      tour: null,
    },
  });
};
