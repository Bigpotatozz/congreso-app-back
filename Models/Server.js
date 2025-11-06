const express = require("express");
const cors = require("cors");
const { pool } = require("../config.js");
const { usuarioRouter } = require("../Routes/usuarioRoutes.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000; // ✅ Lee el puerto de la variable de entorno
    this.connection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  async connection() {
    try {
      // ✅ Test de conexión real
      await pool.query("SELECT NOW()");
      console.log("✅ Conectado a la base de datos Supabase");
    } catch (e) {
      console.error("❌ Error al conectar a la base de datos:", e.message);
    }
  }

  routes() {
    // Root endpoint para verificar que la API funciona
    this.app.get("/", (req, res) => {
      res.json({
        message: "API funcionando correctamente",
        timestamp: new Date().toISOString(),
      });
    });

    this.app.use("/api", usuarioRouter);
  }

  listen() {
    // ✅ Usa this.port y bind a 0.0.0.0 para Render
    this.app.listen(this.port, "0.0.0.0", () => {
      console.log(`🚀 Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = { Server };
