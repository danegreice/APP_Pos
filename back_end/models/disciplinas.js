const mongoose = require("mongoose");

//require("dotenv").config();
//const MONGO_URI = process.env.MONGO_URI;

var Schema = mongoose.Schema;

const disciplina = new Schema({
  codigo: { type: String, required: true },
  nome: { type: String, required: true },
  ch: { type: String, required: true },
  files: { type: Array, required: true },
});

const DisciplinaModel = mongoose.model("disciplinas", disciplina);

module.exports = { DisciplinaModel };
