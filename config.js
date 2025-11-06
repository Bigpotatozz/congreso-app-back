const dotenv = require("dotenv");
const { Pool } = require("pg");
//Accede a DOTENV
dotenv.config();

//Crea un pool para la interaccion con base de datos
//Usa las variables de entorno
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, res) => {
  if (err) {
    // SI HAY UN ERROR DURANTE LA CONEXIÓN, IMPRIME EL ERROR EN LA CONSOLA.
    console.log(err);
  } else {
    // SI LA CONEXIÓN ES EXITOSA, IMPRIME UN MENSAJE INDICANDO LA CONEXIÓN EXITOSA.
    console.log("Conexión exitosa a la Base de Datos");
  }
});

module.exports = { pool };
