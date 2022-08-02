const dotenv = require('dotenv');

// Ruta de nuestro archivo de configuración (Debe estar antes de la importación de la app)
dotenv.config({ path: './config.env' });
const app = require('./app');

// Ver entorno en el que nos encontramos
console.log(app.get('env'));

// Ver entornos de node
console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running in port ${port}`);
});
