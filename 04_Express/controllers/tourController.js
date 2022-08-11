const Tour = require('./../models/tourModel');

exports.getALLTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'Consulta exitosa',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // const tour = await Tour.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'petición exitosa',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
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
