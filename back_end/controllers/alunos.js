const Aluno = require("../models/alunos.js");

exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.AlunoModel.find();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneAluno = async (req, res) => {
  try {
    res.status(201).json(await Aluno.AlunoModel.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createAluno = async (req, res) => {
  try {
    res.status(201).json(await Aluno.AlunoModel.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAluno = async (req, res) => {
  try {
    res
      .status(201)
      .json(await Aluno.AlunoModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePhotoAluno = async (req, res) => {
  try {
    res
      .status(201)
      .json(await Aluno.AlunoModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAluno = async (req, res) => {
  try {
    res
      .status(201)
      .json(await Aluno.AlunoModel.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
