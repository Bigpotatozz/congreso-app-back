const {
  obtenerParticipantes,
  obtenerParticipantePorNombre,
  obtenerParticipante,
  registrarParticipante,
} = require("../Controllers/usuarioController.js");
const { Router } = require("express");

const usuarioRouter = Router();

usuarioRouter.get("/listado", obtenerParticipantes);
usuarioRouter.get("/listadoP", obtenerParticipantePorNombre);
usuarioRouter.get("/participante/:id", obtenerParticipante);
usuarioRouter.post("/registro", registrarParticipante);

module.exports = { usuarioRouter };
