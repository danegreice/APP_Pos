const Disciplina = require("../models/disciplinas.js");

exports.getDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.DisciplinaModel.find();
    res.json(disciplinas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneDisciplina = async (req, res) => {
  try {
    res
      .status(201)
      .json(await Disciplina.DisciplinaModel.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createDisciplina = async (req, res) => {
  try {
    res.status(201).json(await Disciplina.DisciplinaModel.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDisciplina = async (req, res) => {
  try {
    res
      .status(201)
      .json(
        await Disciplina.DisciplinaModel.findByIdAndUpdate(
          req.params.id,
          req.body
        )
      );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDisciplina = async (req, res) => {
  try {
    res
      .status(201)
      .json(await Disciplina.DisciplinaModel.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
