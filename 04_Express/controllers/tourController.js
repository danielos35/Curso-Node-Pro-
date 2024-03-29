const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getALLTours = factory.getAll(Tour);

// exports.getALLTours = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();

//   const tours = await features.query;

//   res.status(200).json({
//     status: 'Consulta exitosa',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

exports.getTour = factory.getOne(Tour,{ path: 'reviews' });

// exports.getTour = catchAsync(async (req, res, next) => {
  
//   // Agregar datos guardados por referencia
//   const tour = await Tour.findById(req.params.id).populate('reviews');

//   if (!tour) {
//     return next(new AppError('No se encontró un tour con ese ID', 404));
//   }

//   res.status(200).json({
//     status: 'petición exitosa',
//     data: { tour },
//   });
// });


exports.createTour = factory.createOne(Tour);

// exports.createTour = catchAsync(async (req, res, next) => {
//   let newTour = await Tour.create(req.body);
//   res.status(201).json({ status: 'success', data: { tour: newTour } });
// });

exports.updateTour = factory.updateOne(Tour);

// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!tour) {
//     return next(new AppError('No se encontró un tour con ese ID', 404));
//   }

//   res.status(200).json({
//     status: 'Solicitud de actualización exitosa',
//     data: {
//       tour,
//     },
//   });
// });

exports.deleteTour = factory.deleteOne(Tour);

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) {
//     return next(new AppError('No se encontró un tour con ese ID', 404));
//   }

//   res.status(200).json({
//     status: 'Solicitud de eliminación exitosa',
//     data: {
//       tour,
//     },
//   });
// });

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    {
      $match: { _id: { $ne: 'EASY ' } },
    },
  ]);

  res.status(200).json({
    status: 'Solicitud exitosa',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = +req.params.year;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        numberTourStarts: -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  res.status(200).json({
    status: 'Solicitud exitosa',
    data: {
      plan,
    },
  });
});