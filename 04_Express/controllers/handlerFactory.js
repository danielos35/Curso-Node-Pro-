const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

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
