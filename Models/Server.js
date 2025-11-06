const express = require("express");
const cors = require("cors");
const { pool } = require("../config.js");
const { usuarioRouter } = require("../Routes/usuarioRoutes.js");

class Server {
  //Inicializacion de los metodos
  constructor() {
    this.app = express();
    this.connection();
    this.middlewares();
    this.routes();
  }

  //Registro de middlewares
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  //Funcion de conexion
  async connection() {
    try {
      await pool;
      console.log("Conectado a la base de datos");
    } catch (e) {
      console.log(e);
    }
  }

  //Registro de rutas
  routes() {
    this.app.use("/api", usuarioRouter);
  }
}

module.exports = { Server };
