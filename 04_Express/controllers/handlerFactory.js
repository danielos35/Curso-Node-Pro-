const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model => 
    catchAsync( async (req, res, next)=>{

    const doc =  await Model.findByIdAndDelete(req.params.id);

    if(!doc){
        return next( new AppError('No se encontró datos con este ID'), 404 );
    }

    res.status(202).json({
        status: 'success', 
        message: 'Se elimino correctamente',
        data: null
    })

})


exports.updateOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No se encontró un doc con este ID', 404));
  }

  res.status(200).json({
    status: 'Se actualizó correctamente la información',
    data: {
      data: doc,
    },
  });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    let document = await Model.create(req.body);
    res.status(201).json({ status: 'Datos creados con exito', data: { data : document } });
});
  
exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
  
  let query = Model.findById(req.params.id);
  if(popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return next(new AppError('No se encontró un documento con ese ID', 404));
  }

  res.status(200).json({
    status: 'Datos encontrados con exito',
    data: { data: doc },
  });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: 'Consulta exitosa',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});