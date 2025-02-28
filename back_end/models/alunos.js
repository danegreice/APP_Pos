const mongoose = require("mongoose");

//require("dotenv").config();
//const MONGO_URI = process.env.MONGO_URI;

var Schema = mongoose.Schema;

const aluno = new Schema({
  idade: { type: Number, required: true },
  nome: { type: String, required: true },
  matricula: { type: Number, required: true },
  email: { type: String, required: true },
  foto: { type: String, default: "" },
});

const AlunoModel = mongoose.model("alunos", aluno);

module.exports = { AlunoModel };
