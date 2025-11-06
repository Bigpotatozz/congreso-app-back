const { pool } = require("../config");

const obtenerParticipantes = async (req, res) => {
  try {
    const participantesQuery = `SELECT * FROM participante`;

    const participantes = await pool.query(participantesQuery);

    return res.status(200).send({
      participantes: participantes.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Error",
    });
  }
};

const registrarParticipante = async (req, res) => {
  const { participante } = req.body;
  console.log(participante);

  try {
    const queryRegistro = `INSERT INTO participante(nombre, apellidoM, apellidoP, email, twitter, ocupacion, foto)
    VALUES($1,$2,$3,$4,$5,$6,$7)`;

    const participanteR = await pool.query(queryRegistro, [
      participante.nombre,
      participante.apellidoM,
      participante.apellidoP,
      participante.email,
      participante.twitter,
      participante.ocupacion,
      participante.foto,
    ]);

    return res.status(200).send({
      message: "Participante registrado",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Error",
    });
  }
};

const obtenerParticipante = async (req, res) => {
  const { id } = req.params;
  try {
    const queryParticipante = `SELECT * FROM participante where id_participante = $1`;

    const participante = await pool.query(queryParticipante, [id]);

    if (participante.rows.length < 1) {
      return res.status(404).send({
        message: "Participante no encontrado",
      });
    }

    return res.status(200).send({
      participante: participante.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Error",
    });
  }
};

const obtenerParticipantePorNombre = async (req, res) => {
  const { query } = req.query;
  try {
    const queryParticipante = `SELECT * FROM participante where nombre like $1`;
    const participante = await pool.query(queryParticipante, [`%${query}%`]);

    if (participante.rows.length < 1) {
      return res.status(404).send({
        message: "Participante no encontrado",
      });
    }

    return res.status(200).send({
      participante: participante.rows,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Error",
    });
  }
};

module.exports = {
  obtenerParticipante,
  registrarParticipante,
  obtenerParticipantePorNombre,
  obtenerParticipantes,
};
