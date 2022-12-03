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