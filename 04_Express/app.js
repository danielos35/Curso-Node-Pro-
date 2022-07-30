const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//MIDDLEWARE....................................................
app.use(morgan('dev'))
app.use(express.json());



// Middleware personalizado
app.use((req, res, next) => {
  console.log('Hola desde el middlwware');
  next();
});

// Middleware para manipular la data
app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);



// MANEJO DE RUTAS

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


const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is no yet defined',
  });
};

// Lo mismo en diferente sintaxis
// app.get('/api/v1/tours', getALLTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// RUTAS

// Crear una ruta por medio de un moddleware
const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getALLTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);


// CREACIÓN DE SERVIDOR
const port = 3000;
app.listen(port, () => {
  console.log(`App running in port ${port}`);
});
