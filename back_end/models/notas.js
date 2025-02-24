const mongoose = require("mongoose");

//require("dotenv").config();
//const MONGO_URI = process.env.MONGO_URI;

var Schema = mongoose.Schema;

const nota = new Schema({
  disciplina: { type: String, required: true },
  nota: { type: Number, required: true },
  matricula: { type: Number, required: true },
});

const NotaModel = mongoose.model("notas", nota);

module.exports = { NotaModel };
