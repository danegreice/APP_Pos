const Nota = require("../models/notas.js");

exports.getNotas = async (req, res) => {
  try {
    const notas = await Nota.NotaModel.find();
    res.json(notas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneNota = async (req, res) => {
  try {
    res.status(201).json(await Nota.NotaModel.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createNota = async (req, res) => {
  try {
    res.status(201).json(await Nota.NotaModel.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNota = async (req, res) => {
  try {
    res
      .status(201)
      .json(await Nota.NotaModel.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNota = async (req, res) => {
  try {
    res.status(201).json(await Nota.NotaModel.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
